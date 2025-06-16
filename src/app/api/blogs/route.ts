import { NextResponse } from "next/server";
 import bigquery from "@/_lib/bigquery";
 
 const projectId = process.env.PROJECT_ID;
 const dataSet = process.env.BLOG_DATASET;

export async function GET() {
    try {
      const query = `
        SELECT 
          bp.page_id,
          c.category_name,
          s.status_name,
          t.type_name,
          ti.title_name,
          sl.slug_name,
          con.content_body,
          d.description_body,
          k.keyword_body,
          a.author_name,
          bp.created_at,
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
        WHERE 
          s.status_name != 'archived'
        ORDER BY bp.created_at DESC
      `;
  
      // Run the query
      const [rows] = await bigquery.query(query);
  
      // Return the data as JSON response
      return NextResponse.json({ articles: rows }, { status: 200 });
  
    } catch (error) {
      console.error('Error querying BigQuery:', error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }