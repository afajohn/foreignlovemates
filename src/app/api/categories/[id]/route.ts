import { NextResponse } from "next/server";
import bigquery from "@/_lib/bigquery";

const projectId = process.env.PROJECT_ID;
const dataSet = process.env.BLOG_DATASET;
const table = `${projectId}.${dataSet}.blog_category`;

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    
    const prms = await params;
    const query = `
      SELECT  category_name, category_id, category_slug, page_type_id 
      FROM \`${table}\`
      WHERE category_id = @id
    `;

    const options = {
      query,
      params: { id: Number(prms.id) },
    };

    const [rows] = await bigquery.query(options);

    if (!rows.length) {
      return NextResponse.json({ message: "Category Not Found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}

// PUT (Update a category)
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const prms = await params;
    const id = Number(prms.id);
    const updatedData: Partial<{ name: string; pagetype: number, slug: string }> = await req.json();

    if (!updatedData.name || !updatedData.pagetype) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const slug = updatedData.name.toLowerCase().replace(/\s+/g, "-");

    const query = `
      UPDATE \`${table}\`
      SET category_name = @name, page_type_id = @pagetype, category_slug = @slug
      WHERE category_id = @id
    `;

    const options = {
      query,
      params: { id, name: updatedData.name, pagetype: updatedData.pagetype, slug },
    };

    await bigquery.query(options);

    return NextResponse.json({ message: "Category updated successfully" , id });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

// DELETE a category
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const prms = await params;

    const id = Number(prms.id);

    const query = `
      DELETE FROM \`${table}\`
      WHERE category_id = @id
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