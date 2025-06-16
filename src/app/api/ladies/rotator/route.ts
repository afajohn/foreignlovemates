import { NextResponse } from "next/server";
import bigquery from "@/_lib/bigquery";
const projectId = process.env.PROJECT_ID;
const dataSet = process.env.LADIES_DATASET;

export async function GET(request:Request){
try{

    const url = new URL(request.url);
    const website = url.searchParams.get('website');


const  query = `
WITH RangeData AS (
  SELECT rotator_start, rotator_end
  FROM \`${projectId}.${dataSet}.ladies_rotators\`
  WHERE website = @website
  LIMIT 1
),
NumberArray AS (
  SELECT
    rotator_start + x AS random_value
  FROM RangeData,
  UNNEST(GENERATE_ARRAY(0, rotator_end - rotator_start)) AS x
),
Shuffled AS (
  SELECT random_value
  FROM NumberArray
  ORDER BY RAND()
)
SELECT random_value         
FROM Shuffled       
LIMIT 8;            
  `;      
    


      const options = {
        query: query,
        params: {
          website: website || false,
        },
      };

    const [rows] = await bigquery.query(options);

    return NextResponse.json(rows);
}catch (error) {
  console.log(error)
    return NextResponse.json({ error: 'Error querying BigQuery' }, { status: 500 });
  }

} 
