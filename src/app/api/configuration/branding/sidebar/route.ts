import  { NextRequest, NextResponse } from "next/server";
import bigquery from "@/_lib/bigquery";
import { nanoid } from "nanoid";

const projectId = process.env.PROJECT_ID;


export async function GET () {

    try {

 
          const  query = `
            SELECT 
            bs.sidebar_id,
               bs.title,
                bs.icon,
               si.name,
               si.link,
               si.item_id
             FROM 
      \`${projectId}.website_configuration.branding_sidebar\` AS bs
          LEFT JOIN 
      \`${projectId}.website_configuration.sidebar_items\` AS si ON bs.sidebar_id = si.sidebar_id
            `;
             const [rows] = await bigquery.query(query);
             // Return the response with the query result
             return NextResponse.json({ data: rows });

             }catch(error) {
              console.log(error)
              return NextResponse.json({ error: 'Error executing query' }, { status: 500 });
             }
          }
        
          
          export async function POST(req: NextRequest) {
            try {
              const body = await req.json();
              const { id, title } = body;
          
              console.log("Received Data:", { id, title }); // Debugging
          
              if (!id || !title) {
                return NextResponse.json({ error: "ID and Title are required" }, { status: 400 });
              }
          
              // Check if the ID already exists
              const checkQuery = `SELECT COUNT(*) as count FROM \`${projectId}.website_configuration.branding_sidebar\` WHERE sidebar_id = @id`;
              const checkOptions = {
                query: checkQuery,
                params: { id },
              };
          
              const [rows] = await bigquery.query(checkOptions);
              const recordExists = rows[0]?.count > 0;
          
              if (recordExists) {
                return NextResponse.json({ error: "ID already exists" }, { status: 400 });
              }
          
              // Insert the new record
              const insertQuery = `INSERT INTO \`${projectId}.website_configuration.branding_sidebar\` (sidebar_id, title)
                                   VALUES (@id, @title)`;
              const insertOptions = {
                query: insertQuery,
                params: { id, title },
              };
          
              await bigquery.query(insertOptions);

          
              return NextResponse.json({ message: "Sidebar item added successfully", sidebar_id: id });
            } catch (error) {
              console.error("BigQuery Insert Error:", error);
              return NextResponse.json({ error: "Error inserting data" }, { status: 500 });
            }
          }
          
          