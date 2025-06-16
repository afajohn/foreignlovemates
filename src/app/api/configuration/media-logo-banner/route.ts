import bigquery from "@/_lib/bigquery";
import { UploadToGCS_BQ } from "@/_lib/storage";
import { NextResponse, type NextRequest } from "next/server";

const projectId = <string>process.env.PROJECT_ID;
const dataset_Id = <string>process.env.ATTACHMENTS_DATASET;
const attachmentsTable = <string>process.env.ATTACHMENTS_DATASET_TABLE;

export async function POST(req: NextRequest) {
	const form = await req.formData();
	const file = form.get("file") as File;
	const success = await UploadToGCS_BQ(file);

	return NextResponse.json({ message: success });
}

export async function GET() {
	const query = `SELECT * 
		FROM \`${projectId}.${dataset_Id}.${attachmentsTable}\``;

	const options = {
		query: query,
	};
	try {
		const [job] = await bigquery.createQueryJob(options);

		const [rows] = await job.getQueryResults();

		return NextResponse.json(rows);
	} catch (error) {
		const message = (error as { message: string }).message;
		return Response.json({ error: message }, { status: 500 });
	}
}

// export async function DELETE() {
// 	const query = `DELETE FROM \`${projectId}.${dataset_Id}.${attachmentsTable}\` WHERE folder_name = "media-logo-banner"`;

// 	const options = {
// 		query: query,
// 	}
// 	try {
// 		const [job] = await bigquery.createQueryJob(options);
// 		const [rows] = await job.getQueryResults();
// 		return NextResponse.json(rows);
// 	} catch (error) {
// 		const message = (error as { message: string }).message;
// 		return NextResponse.json({ error: message }, { status: 500 });
// 	}
// }
