import { NextResponse } from "next/server";
import bigquery from "@/_lib/bigquery";

const projectId = process.env.PROJECT_ID;
const dataSet = process.env.LADIES_DATASEt

export async function GET(request:Request){

try{


    const url = new URL(request.url);
    const website = url.searchParams.get('website');
    const allsites = url.searchParams.get('allsites');
    const womenCountry = url.searchParams.get('womenCountry')
    const page = Number.parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = Number.parseInt(url.searchParams.get("pageSize") || "10", 10); 
    const offset = (page - 1) * pageSize;



let query =
`SELECT
lp.ladies_id,
lp.first_name,
lp.date_of_birth,
lp.city_id,
co.country_name,
z.zodiac_sign,
cl.location_name,
ph.weight,
ph.height,
e.eye_color,
h.hair_id,
ms.marital_status_id,
r.religion_id,
s.smoker_id,
dr.drinker_id,
ed.education_id,
u.url_id,
st.status_id,
 FROM \`youtube-cenix.${dataSet}.ladies_profile\` as lp      
   LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_country\` AS co ON lp.country_id = co.country_id
   LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_zodiac\` AS z ON lp.zodiac_id = z.zodiac_id
    LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_current_location\` AS cl ON lp.current_location_id = cl.current_location_id
    LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_physical\` AS ph ON lp.physical_id = ph.physical_id
   LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_eye\` AS e ON lp.eye_id = e.eye_id
   LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_hair\` AS h ON lp.hair_id = h.hair_id
   LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_marital_status\` AS ms ON lp.marital_status_id = ms.marital_status_id
   LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_religion\` AS r ON lp.religion_id = r.religion_id
   LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_smoker\` AS s ON lp.smoker_id = s.smoker_id
   LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_drinker\` AS dr ON lp.drinker_id = dr.drinker_id
   LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_education\` AS ed ON lp.education_id = ed.education_id
   LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_url\` AS u ON lp.url_id = u.url_id
   LEFT JOIN 
   \`${projectId}.${dataSet}.ladies_status\` AS st ON lp.status_id = st.status_id
`;


if(website){
  query = `
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
  UNNEST(GENERATE_ARRAY(0, rotator_end - rotator_start)) AS x  -- Create a range of numbers from start to end
),
Shuffled AS (
  SELECT random_value
  FROM NumberArray
  ORDER BY RAND()  -- Randomly shuffle the numbers
)
SELECT random_value
FROM Shuffled
LIMIT 8;
  `;
}


      if (womenCountry) {
        query += ` WHERE co.country_name = @womenCountry
ORDER BY lp.ladies_id
LIMIT @pageSize OFFSET @offset `;
      }

      if(allsites) {
        query = `
        select website
        from \`${projectId}.${dataSet}.ladies_rotators\`
        `
      }
      
      if(!website || !womenCountry || !allsites) {
        query += `
          LIMIT 4
        `;
      }


      const options = {
        query: query,
        params: {
          womenCountry: womenCountry ? womenCountry.trim().toLowerCase() : "", 
          pageSize: pageSize,
          offset: offset,
          website: website || false,
          allsites:allsites ||false,
        },
      };



    const [rows] = await bigquery.query(options);

    return NextResponse.json(rows);
}catch (error) {
  console.log(error)
    return NextResponse.json({ error: 'Error querying BigQuery' }, { status: 500 });
  }

} 