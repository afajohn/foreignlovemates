import { NextResponse } from "next/server";
import bigquery from "@/_lib/bigquery";
import { nanoid } from 'nanoid';
import { fetchCategoriesAndPageTypes } from "@/_lib/fetch-catpt";
import { checkSlugExists, getArticleParams, getArticlesQuery, getPaginationParams, getTotalRecords } from "@/_lib/fetch-article";

const projectId = process.env.PROJECT_ID;
const dataSet = process.env.BLOG_DATASET;

type QueryParams = { [key: string]: string | number | null };

interface Image {
  image_path: string;
  image_caption?: string;
  image_alt?: string;
}


export async function POST(request: Request) {
  try {
    const { category_name, page_status, page_type, title, content, description, keywords, slug, author, image, } = await request.json();
    
    console.log("Received data:", { category_name, page_status, page_type, title, content, description, keywords, slug, author, image });

    // Helper function to execute query and get result
    const queryDatabase = async (query: string, params: QueryParams) => {

      const filteredParams = Object.keys(params).reduce((acc, key) => {
        if (params[key] === null || params[key] === undefined) {
          acc[key] = null; // Explicitly allow null
        } else {
          acc[key] = params[key];
        }
        return acc;
      }, {} as QueryParams);

      // Create a types object that matches the params
      const typesObject = Object.keys(filteredParams).reduce((acc, key) => {
        const paramValue = filteredParams[key];
        if (paramValue === null) {
          acc[key] = 'STRING'; // Default to STRING for null values (or another type based on your needs)
        } else {
          const paramType = typeof paramValue === 'string' ? 'STRING' : 'INT64';
          acc[key] = paramType;
        }
        return acc;
      }, {} as { [key: string]: string });

      const [result] = await bigquery.query({ query, params: filteredParams, types: typesObject });
      return result;
    };

    // unang step brad checkon ang slug uhuh
    const slugExists = await checkSlugExists(slug, category_name, page_type);
    if (slugExists) {
      return NextResponse.json({ error: 'A page with this slug, category, and page type already exists. Choose a different slug.' }, { status: 400 });
    }

    // Step 1: Retrieve category_id, status_id, and type_id
    const categoryQuery = `SELECT category_id FROM \`${projectId}.${dataSet}.blog_category\` WHERE category_slug = @category_name`;
    const statusQuery = `SELECT status_id FROM \`${projectId}.${dataSet}.blog_page_status\` WHERE status_name = @page_status`;
    const typeQuery = `SELECT type_id FROM \`${projectId}.${dataSet}.page_type\` WHERE type_slug = @page_type`;
    
    const [categoryResult, statusResult, typeResult] = await Promise.all([
      queryDatabase(categoryQuery, { category_name }),
      queryDatabase(statusQuery, { page_status }),
      queryDatabase(typeQuery, { page_type })
    ]);

    if (!categoryResult.length || !statusResult.length || !typeResult.length) {
      return NextResponse.json({ error: 'Invalid category, status, or type' }, { status: 400 });
    }

    // Step 2: Insert into title and slug tables using nanoid, and include page_id
    const insertTitleQuery = `INSERT INTO \`${projectId}.${dataSet}.blog_title\` (title_name, title_id, page_id) VALUES (@title, @title_id, @page_id)`;
    const insertSlugQuery = `INSERT INTO \`${projectId}.${dataSet}.blog_slug\` (slug_name, slug_id, page_id) VALUES (@slug, @slug_id, @page_id)`;
    const title_id = nanoid(12);
    const slug_id = nanoid(12);
    const page_id = nanoid(12); // Generate a page_id

    await Promise.all([
      queryDatabase(insertTitleQuery, { title, title_id, page_id }),
      queryDatabase(insertSlugQuery, { slug, slug_id, page_id }),
    ]);

    // Step 3: Retrieve title_id and slug_id based on title and slug
    const titleIdQuery = `SELECT title_id FROM \`${projectId}.${dataSet}.blog_title\` WHERE title_name = @title`;
    const slugIdQuery = `SELECT slug_id FROM \`${projectId}.${dataSet}.blog_slug\` WHERE slug_name = @slug`;

    const [titleIdResult, slugIdResult] = await Promise.all([
      queryDatabase(titleIdQuery, { title }),
      queryDatabase(slugIdQuery, { slug }),

    ]);


    const insertImageQuery = `
      INSERT INTO \`${projectId}.${dataSet}.blog_image\`
      (image_path, image_id, page_id, image_caption, image_alt)
      VALUES (@image_path, @image_id, @page_id, @image_caption, @image_alt)
    `;

    let firstImageId = null;
    const imagePromises = image.map((img:Image, index:number) => {
      const image_id = nanoid(12); // Generate unique ID for each image
      if (index === 0) firstImageId = image_id; // Save the first image ID to link with blog_page

      return queryDatabase(insertImageQuery, {
        image_path: img.image_path,
        image_id,
        page_id,
        image_caption: img.image_caption ?? null, // Use null if image_caption is undefined
        image_alt: img.image_alt ?? null, 
      });
    });

    // Execute all image insert queries
    await Promise.all(imagePromises);


    const title_id_result = titleIdResult[0].title_id;
    const slug_id_result = slugIdResult[0].slug_id;
    // Step 4: Insert content, description, keywords, and author into respective tables using nanoid and page_id
    const insertContentQuery = `INSERT INTO \`${projectId}.${dataSet}.blog_content\` (content_body, content_id, page_id) VALUES (@content, @content_id, @page_id)`;
    const insertDescriptionQuery = `INSERT INTO \`${projectId}.${dataSet}.blog_description\` (description_body, description_id, page_id) VALUES (@description, @description_id, @page_id)`;
    const insertKeywordsQuery = `INSERT INTO \`${projectId}.${dataSet}.blog_keywords\` (keyword_body, keyword_id, page_id) VALUES (@keywords, @keyword_id, @page_id)`;
    const insertAuthorQuery = `INSERT INTO \`${projectId}.${dataSet}.blog_author\` (author_name, author_id, page_id) VALUES (@author, @author_id, @page_id)`;

    const content_id = nanoid(12);
    const description_id = nanoid(12);
    const keyword_id = nanoid(12);
    const author_id = nanoid(12);

    await Promise.all([
      queryDatabase(insertContentQuery, { content, content_id, page_id }),
      queryDatabase(insertDescriptionQuery, { description, description_id, page_id }),
      queryDatabase(insertKeywordsQuery, { keywords, keyword_id, page_id }),
      queryDatabase(insertAuthorQuery, { author, author_id, page_id })
    ]);

    // Step 5: Insert into blog_page and link all IDs
    const insertBlogPageQuery = `
      INSERT INTO \`${projectId}.${dataSet}.blog_page\`
      (category_id, status_id, type_id, title_id, slug_id, content_id, description_id, keyword_id, author_id, created_at, page_id,image_id)
      VALUES (@category_id, @status_id, @type_id, @title_id, @slug_id, @content_id, @description_id, @keyword_id, @author_id, CURRENT_TIMESTAMP(), @page_id, @image_id)
    `;

    await queryDatabase(insertBlogPageQuery, {
      category_id: categoryResult[0].category_id,
      status_id: statusResult[0].status_id,
      type_id: typeResult[0].type_id,
      title_id: title_id_result,
      slug_id: slug_id_result,
      content_id,
      description_id,
      keyword_id,
      author_id,
      page_id,
      image_id: firstImageId // Link the first image to blog_page
    });

    return NextResponse.json({ message: 'Blog page and related data inserted successfully!' }, { status: 201 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: 'Error querying BigQuery' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { page, pageSize, offset} = getPaginationParams(request.url);
    const { slugCheck, ctgy, pt, sq, slug, pageId } = getArticleParams(request.url);
    if (slugCheck) {
      const exists = await checkSlugExists(slug, ctgy, pt, pageId) 
      return NextResponse.json(exists);
    }
    const { totalRecords, totalPages } = await getTotalRecords(sq, ctgy, pt);
    const query = getArticlesQuery(pageSize, offset, ctgy, pt, sq);
    const [rows] = await bigquery.query(query);

    const { categoryNames, pageTypeNames } = await fetchCategoriesAndPageTypes();
    
    return NextResponse.json(
      ctgy==='default'? { 
        articles: rows, 
        totalRecords, 
        totalPages, 
        categoryNames, 
        pageTypeNames, 
        currentPage: page, 
        pageSize }:
      {
        articles: rows,
        totalRecords,
        totalPages,
        currentPage: page,
        pageSize,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error querying BigQuery:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}