import { NextRequest, NextResponse } from "next/server";
import bigquery from "@/_lib/bigquery";

const projectId = process.env.PROJECT_ID;

export async function PUT(req: NextRequest, { params }: { params: { level: string } }) {
  try {
    const body = await req.json();
    const { color_shade } = body;
    const { level: color_level } = await params; 

    if (!color_level || !color_shade || typeof color_shade !== "object") {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Check if color_level exists
    const checkQuery = `
      SELECT color_level FROM \`${projectId}.website_configuration.color_shade\` 
      WHERE color_level = "${color_level}" 
      LIMIT 1
    `;

    const [existing] = await bigquery.query(checkQuery);
    if (existing.length === 0) {
      return NextResponse.json({ error: "Color level not found" }, { status: 404 });
    }

    // Generate UPDATE SET statements dynamically
    const updates = Object.entries(color_shade)
      .map(([shade, color]) => `\`${shade}\` = "${color}"`)
      .join(", ");

    const query = `
      UPDATE \`${projectId}.website_configuration.color_shade\`
      SET ${updates}
      WHERE color_level = "${color_level}"
    `;

    await bigquery.query(query);

    return NextResponse.json({ message: "Color updated successfully!" });
  } catch (error) {
    console.error("Error updating color shades:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { level: string } }) {
  try {
    const { level: color_level } = await params;

    if (!color_level) {
      return NextResponse.json({ error: "Color level is required" }, { status: 400 });
    }

    // Check if the color level exists
    const checkQuery = `
      SELECT color_level FROM \`${projectId}.website_configuration.color_shade\` 
      WHERE color_level = "${color_level}" 
      LIMIT 1
    `;

    const [existing] = await bigquery.query(checkQuery);
    if (existing.length === 0) {
      return NextResponse.json({ error: "Color level not found" }, { status: 404 });
    }

    // Delete all rows that match the color level
    const deleteQuery = `
      DELETE FROM \`${projectId}.website_configuration.color_shade\`
      WHERE color_level = "${color_level}"
    `;

    await bigquery.query(deleteQuery);

    return NextResponse.json({ message: `All colors under '${color_level}' deleted successfully!` });
  } catch (error) {
    console.error("Error deleting color level:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
