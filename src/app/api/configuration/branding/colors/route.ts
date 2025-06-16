import  { NextRequest, NextResponse } from "next/server";
import bigquery from "@/_lib/bigquery";


const projectId = process.env.PROJECT_ID;


export async function GET () {

    try {

 
          const  query = `
            SELECT 
               cl.color_level,
               cs.50,
               cs.100,
                cs.200,
             cs.300,
               cs.400,
            cs.500,
              cs.600,
              cs.700,
              cs.800,
              cs.900,
             FROM 
      \`${projectId}.website_configuration.branding_color\` AS cl
          LEFT JOIN 
      \`${projectId}.website_configuration.color_shade\` AS cs ON cl.color_level = cs.color_level
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
              const { color_level, color_shade } = body;
          
              if (!color_level || !color_shade || typeof color_shade !== "object") {
                return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
              }
          
              // Check if the color_level already exists
              const checkQuery = `
                SELECT COUNT(*) AS count 
                FROM \`${projectId}.website_configuration.color_shade\`
                WHERE color_level = "${color_level}"
              `;
          
              const [rows] = await bigquery.query(checkQuery);
              if (rows[0].count > 0) {
                return NextResponse.json({ error: `Color level "${color_level}" already exists` }, { status: 400 });
              }
          
              // Ensure all expected columns exist
              const shadeLevels = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
              const values = shadeLevels.map(level => `"${color_shade[level] || ""}"`).join(", ");
          
              const insertQuery = `
                INSERT INTO \`${projectId}.website_configuration.color_shade\`
                (color_level, \`50\`, \`100\`, \`200\`, \`300\`, \`400\`, \`500\`, \`600\`, \`700\`, \`800\`, \`900\`)
                VALUES ("${color_level}", ${values})
              `;
          
              await bigquery.query(insertQuery);
          
              return NextResponse.json({ message: "Color shades added successfully" });
            } catch (error) {
              console.error("Error inserting color shades:", error);
              return NextResponse.json({ error: "Internal server error" }, { status: 500 });
            }
          }
          