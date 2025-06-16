import { NextRequest, NextResponse } from "next/server";
import bigquery from "@/_lib/bigquery";

const projectId = process.env.PROJECT_ID;


export async function PUT(req: NextRequest, { params }: { params: { sidebar_id: string } }) {
  try {
    const { sidebar_id } = await params;
    const { icon } = await req.json();

    if (!icon) {
      return NextResponse.json({ error: "Icon is required" }, { status: 400 });
    }

    const query = `UPDATE \`${projectId}.website_configuration.branding_sidebar\`
                   SET icon = @icon
                   WHERE sidebar_id = @sidebar_id`;

    const options = {
      query,
      params: { sidebar_id, icon },
    };

    await bigquery.query(options);

    return NextResponse.json({ message: "Icon updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error updating data" }, { status: 500 });
  }
}
