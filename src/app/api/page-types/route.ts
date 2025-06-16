import { NextResponse } from "next/server";
import { BigQuery } from "@google-cloud/bigquery";
import { getPaginationParams } from "@/_lib/fetch-article";

const projectId = process.env.PROJECT_ID;
const dataSet = process.env.BLOG_DATASET;
const tableName = "page_type";  
const bigquery = new BigQuery();

// POST (Create a new category)
export async function POST(req: Request) {
  try {
    const { name, slug } = await req.json();
    if (!name || !slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const getMaxIdQuery = `
      SELECT IFNULL(MAX(type_id), 0) + 1 AS new_id
      FROM \`${projectId}.${dataSet}.${tableName}\`
      `;

    const [rows] = await bigquery.query(getMaxIdQuery);
    const newCategoryId = rows[0]?.new_id ?? 1;

    const query = `
      INSERT INTO \`${projectId}.${dataSet}.${tableName}\`
      (type_id, type_name, type_slug)
      VALUES (@id, @name, @slug)
    `;

    const options = {
      query,
      params: {id: newCategoryId, name, slug },
    };

    await bigquery.query(options);

    return NextResponse.json({ message: "Page Type added successfully" }, { status: 201 });
  } catch (error) {
    console.error("BigQuery Insert Error:", error);
    return NextResponse.json({ error: "Error adding category" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    const {offset, pageSize} = getPaginationParams(request.url);
    
    let query = `SELECT * FROM \`${projectId}.${dataSet}.${tableName}\``;
    const params: Record<string, unknown> = {};

    if (id) {
      query += " WHERE id = @id";
      params.id = Number(id);
    } else if (searchQuery) {
      query += " WHERE LOWER(name) LIKE @searchQuery OR LOWER(slug) LIKE @searchQuery";
      params.searchQuery = `%${searchQuery}%`;
    }

    query += " LIMIT @pageSize OFFSET @offset";
    params.pageSize = pageSize;
    params.offset = offset;

    const options = { query, params };

    const [rows] = await bigquery.query(options);

    return NextResponse.json({ entities: rows, totalPages: Math.ceil(rows.length / pageSize) });

  } catch (error) {
    console.error("BigQuery Error:", error);
    return NextResponse.json({ error: "Error fetching page type" }, { status: 500 });
  }
}

