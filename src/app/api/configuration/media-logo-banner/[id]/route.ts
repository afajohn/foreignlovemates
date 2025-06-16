import bigquery from "@/_lib/bigquery";
import { type NextRequest, NextResponse } from "next/server";

//get all files where column name is page_id
export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params; // Extracting from dynamic route params

	// Validate `id` (ensure it's alphanumeric to prevent SQL injection)
	if (!id || !/^[a-zA-Z0-9_-]+$/.test(id)) {
		return NextResponse.json(
			{ error: "Invalid page_id format" },
			{ status: 400 },
		);
	}

	const query = `
		SELECT page_id 
		FROM \`${process.env.PROJECT_ID}.${process.env.ATTACHMENTS_DATASET}.${process.env.ATTACHMENTS_DATASET_TABLE}\`
		WHERE page_id = @id
	`;

	const options = {
		query,
		params: { id }, // Proper parameterized query
	};

	try {
		const [job] = await bigquery.createQueryJob(options);
		const [rows] = await job.getQueryResults();
		return NextResponse.json(rows);
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : String(error) },
			{ status: 500 },
		);
	}
}

