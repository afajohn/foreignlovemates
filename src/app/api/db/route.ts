
import bigquery from "@/_lib/bigquery";
import { NextResponse } from "next/server";

const datasetId = process.env.BIGQUERY_DATASET!;
const tableId = process.env.BIGQUERY_TABLE!;

// Insert Data into BigQuery
export async function POST(req: Request) {
  try {
    const { title, description,slug,content } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const rows = [{ title, description,slug,content }];
    await bigquery.dataset(datasetId).table(tableId).insert(rows);

    return NextResponse.json({ message: "Data inserted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error inserting data", details: error }, { status: 500 });
  }
}

// Fetch Data from BigQuery
export async function GET() {
  try {
    const [rows] = await bigquery.dataset(datasetId).table(tableId).getRows();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data", details: error }, { status: 500 });
  }
}