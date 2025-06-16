import { NextResponse } from "next/server";
import { BigQuery } from "@google-cloud/bigquery";

const projectId = process.env.PROJECT_ID;
const dataSet = process.env.BLOG_DATASET;
const tableName = "page_type";  
const bigquery = new BigQuery();

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const prms = await params;
    const query = `
      SELECT  *
      FROM \`${projectId}.${dataSet}.${tableName}\`
      WHERE type_id = @id
    `;

    const options = {
      query,
      params: { id: Number(prms.id) },
    };

    const [rows] = await bigquery.query(options);

    if (!rows.length) {
      return NextResponse.json({ message: "Page type Not Found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch page type" }, { status: 500 });
  }
}


// DELETE a page type
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const prms = await params;
    const id = Number(prms.id);
    const query = `
      DELETE FROM \`${projectId}.${dataSet}.${tableName}\`
      WHERE type_id = @id
    `;

    const options = {
      query,
      params: { id },
    };

    await bigquery.query(options);

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}



// PUT (Update a category)
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const prms = await params;
    const id = Number(prms.id);
    const updatedData: Partial<{ name: string; slug: string }> = await req.json();

    if (!updatedData.name || !updatedData.slug) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const slug = updatedData.name.toLowerCase().replace(/\s+/g, "-");

    const query = `
      UPDATE \`${projectId}.${dataSet}.${tableName}\`
      SET type_name = @name, type_slug = @slug
      WHERE type_id = @id
    `;

    const options = {
      query,
      params: { id, name: updatedData.name, slug },
    };

    await bigquery.query(options);

    return NextResponse.json({ message: "Page type updated successfully" });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update page type" }, { status: 500 });
  }
}