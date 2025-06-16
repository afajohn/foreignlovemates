
import bigquery from "@/_lib/bigquery";
import { checkSlugExists } from "@/_lib/fetch-article";
import { fetchCategoriesAndPageTypes } from "@/_lib/fetch-catpt";
import { NextResponse } from "next/server";


const projectId = process.env.PROJECT_ID;
const dataSet = process.env.BLOG_DATASET;


export async function GET (request:Request,{params}:{params:Promise<{id:string}>}) {
try{
const {id} = await params;


const query = `
SELECT 
bp.page_id,
c.category_slug,
s.status_name,
t.type_slug,
ti.title_name,
sl.slug_name,
con.content_body,
d.description_body,
k.keyword_body,
a.author_name,
       ARRAY(
          SELECT AS STRUCT 
            i.image_path, 
            i.image_caption, 
            i.image_alt 
          FROM 
            \`${projectId}.${dataSet}.blog_image\` AS i
          WHERE 
            i.page_id = bp.page_id
        ) AS images
FROM 
\`${projectId}.${dataSet}.blog_page\` AS bp
LEFT JOIN 
\`${projectId}.${dataSet}.blog_category\` AS c ON bp.category_id = c.category_id
LEFT JOIN 
\`${projectId}.${dataSet}.blog_page_status\` AS s ON bp.status_id = s.status_id
LEFT JOIN 
\`${projectId}.${dataSet}.page_type\` AS t ON bp.type_id = t.type_id
LEFT JOIN 
\`${projectId}.${dataSet}.blog_title\` AS ti ON bp.title_id = ti.title_id
LEFT JOIN 
\`${projectId}.${dataSet}.blog_slug\` AS sl ON bp.slug_id = sl.slug_id
LEFT JOIN 
\`${projectId}.${dataSet}.blog_content\` AS con ON bp.content_id = con.content_id
LEFT JOIN 
\`${projectId}.${dataSet}.blog_description\` AS d ON bp.description_id = d.description_id
LEFT JOIN 
\`${projectId}.${dataSet}.blog_keywords\` AS k ON bp.keyword_id = k.keyword_id
LEFT JOIN 
\`${projectId}.${dataSet}.blog_author\` AS a ON bp.author_id = a.author_id
WHERE bp.page_id = @id`;

  // Run the query
  const [rows] = await bigquery.query({
    query,
    params:{id},
  });
  const { categoryNames, pageTypeNames } = await fetchCategoriesAndPageTypes();
    // Return the data as JSON response
    return NextResponse.json( {... rows[0], categoryNames, pageTypeNames} ,{status:200}) ;
  } catch (error) {
    console.error('Error querying BigQuery:', error);
    return NextResponse.json({ error },{status:500}) ;
  }

}


export async function PUT (request:Request,{params}:{params:Promise<{id:string}>}){
    try{
        const {id} = await params;

        const body = await request.json();

        const updateQueries: string[] = [];
        const queryParams = { id, title: '', category_name: '', page_status: '', page_type: '', slug: '', content: '', description: '', keywords: '', author: '', image: '' }; 
        const slugExists = await checkSlugExists(body.slug, body.category_name, body.page_type, id);
        if (slugExists) {
          return NextResponse.json({ error: 'A page with this slug, category, and page type already exists. Choose a different slug.' }, { status: 400 });
        }
        if(body.title) {
            updateQueries.push(`
             UPDATE \`${projectId}.${dataSet}.blog_title\`
             SET title_name = @title
             WHERE title_id = (SELECT title_id FROM \`${projectId}.${dataSet}.blog_page\`WHERE page_id = @id)   
                `);
                queryParams.title = body.title
        }
        if (body.category_name) {
            updateQueries.push(`
              UPDATE \`${projectId}.${dataSet}.blog_page\`
              SET category_id = (
                SELECT category_id
                FROM \`${projectId}.${dataSet}.blog_category\`
                WHERE category_slug = @category_name
                LIMIT 1  
              )
              WHERE page_id = @id
            `);
            queryParams.category_name = body.category_name;
          }

          if (body.page_status) {
            updateQueries.push(`
              UPDATE \`${projectId}.${dataSet}.blog_page\`
              SET status_id = (
                SELECT status_id
                FROM \`${projectId}.${dataSet}.blog_page_status\`
                WHERE status_name = @page_status
                LIMIT 1  
              )
              WHERE page_id = @id
            `);
            queryParams.page_status = body.page_status;
          }

          if (body.page_type) {
            updateQueries.push(`
              UPDATE \`${projectId}.${dataSet}.blog_page\`
              SET type_id = (
                SELECT type_id
                FROM \`${projectId}.${dataSet}.page_type\`
                WHERE type_slug = @page_type
                LIMIT 1  
              )
              WHERE page_id = @id
            `);
            queryParams.page_type = body.page_type;
          }
          if(body.slug) {
            updateQueries.push(`
             UPDATE \`${projectId}.${dataSet}.blog_slug\`
             SET slug_name = @slug
             WHERE slug_id = (SELECT slug_id FROM \`${projectId}.${dataSet}.blog_page\`WHERE page_id = @id)   
                `);
                queryParams.slug = body.slug
        }
        if(body.content) {
            updateQueries.push(`
             UPDATE \`${projectId}.${dataSet}.blog_content\`
             SET content_body = @content
             WHERE content_id = (SELECT content_id FROM \`${projectId}.${dataSet}.blog_page\`WHERE page_id = @id)   
                `);
                queryParams.content = body.content
        }
        if(body.description) {
            updateQueries.push(`
             UPDATE \`${projectId}.${dataSet}.blog_description\`
             SET description_body = @description
             WHERE description_id = (SELECT description_id FROM \`${projectId}.${dataSet}.blog_page\`WHERE page_id = @id)   
                `);
                queryParams.description = body.description
        }
        if(body.keywords) {
            updateQueries.push(`
             UPDATE \`${projectId}.${dataSet}.blog_keywords\`
             SET keyword_body = @keywords
             WHERE keyword_id = (SELECT keyword_id FROM \`${projectId}.${dataSet}.blog_page\`WHERE page_id = @id)   
                `);
                queryParams.keywords = body.keywords
        }
        if(body.author) {
            updateQueries.push(`
             UPDATE \`${projectId}.${dataSet}.blog_author\`
             SET author_name = @author
             WHERE author_id = (SELECT author_id FROM \`${projectId}.${dataSet}.blog_page\`WHERE page_id = @id)   
                `);
                queryParams.author = body.author
        }
        if(body.image) {
            updateQueries.push(`
             UPDATE \`${projectId}.${dataSet}.blog_image\`
             SET image_path = @image
             WHERE image_id = (SELECT image_id FROM \`${projectId}.${dataSet}.blog_page\`WHERE page_id = @id)   
                `);
                queryParams.image = body.image
        }
        
        updateQueries.push(`
          INSERT INTO \`${projectId}.${dataSet}.blog_edited\` (blog_id, time_edit)
          VALUES (@id, CURRENT_TIMESTAMP())
        `);

        if (updateQueries.length === 0) {
            return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
          }
      
          // Run all the update queries for the fields provided in the request
          await Promise.all(
            updateQueries.map((query) => 
              bigquery.query({ query, params: queryParams })
            )
          );

          return NextResponse.json({ message: 'Blog page updated successfully' }, { status: 200 });
    } catch(err){
        console.error('Error updating blog page:', err);
        return NextResponse.json({ err }, { status: 500 });
      }
}



export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
  
      // Start by deleting related rows in other tables
      const queries = [

        `DELETE FROM \`${projectId}.${dataSet}.blog_title\` WHERE title_id = (SELECT title_id FROM \`${projectId}.${dataSet}.blog_page\` WHERE page_id = @id)`,
        `DELETE FROM \`${projectId}.${dataSet}.blog_slug\` WHERE slug_id = (SELECT slug_id FROM \`${projectId}.${dataSet}.blog_page\` WHERE page_id = @id)`,
        `DELETE FROM \`${projectId}.${dataSet}.blog_keywords\` WHERE keyword_id = (SELECT keyword_id FROM \`${projectId}.${dataSet}.blog_page\` WHERE page_id = @id)`,
        `DELETE FROM \`${projectId}.${dataSet}.blog_content\` WHERE content_id = (SELECT content_id FROM \`${projectId}.${dataSet}.blog_page\` WHERE page_id = @id)`,
        `DELETE FROM \`${projectId}.${dataSet}.blog_description\` WHERE description_id = (SELECT description_id FROM \`${projectId}.${dataSet}.blog_page\` WHERE page_id = @id)`,
        `DELETE FROM \`${projectId}.${dataSet}.blog_image\` WHERE image_id = (SELECT image_id FROM \`${projectId}.${dataSet}.blog_page\` WHERE page_id = @id)`,
         `DELETE FROM \`${projectId}.${dataSet}.blog_image\` WHERE image_id = (SELECT image_id FROM \`${projectId}.${dataSet}.blog_page\` WHERE page_id = @id)`,
        `DELETE FROM \`${projectId}.${dataSet}.blog_page\` WHERE page_id = @id`, 
      ];
  
      // Execute the queries
      for (const query of queries) {
        await bigquery.query({
          query,
          params: { id },
        });
      }
  
      return NextResponse.json({ message: 'Row and related data successfully deleted' }, { status: 200 });
      
    } catch (error) {
      console.error('Error deleting from BigQuery:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  