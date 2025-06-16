import { NextResponse } from "next/server"
import bigquery from "@/_lib/bigquery";

const projectId = process.env.PROJECT_ID;
const dataSet = process.env.LADIES_DATASET;


export  async function GET(req:Request,{params}:{params:Promise<{id:string}>}) {
    try {

        const {id} = await params;
         
    if (!id){
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const query = `SELECT * FROM \`${projectId}.${dataSet}.copy_ladies_profile_raw\` WHERE ladies_id = @id LIMIT 1`;
    const [rows] = await bigquery.query({
      query,
      params: { id }, 
    });
    
    return NextResponse.json(rows[0]);
    }catch (error) {
      console.log(error)
        return NextResponse.json({ error: 'Error querying Lady' }, { status: 500 });
      }

}