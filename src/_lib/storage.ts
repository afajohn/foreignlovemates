import { Storage } from "@google-cloud/storage";
import bigquery from "./bigquery";
import { v4 as uuidv4 } from 'uuid';
import { take } from "lodash";

const storage = new Storage();
// const projectId = process.env.PROJECT_ID;
const dataset_Id = process.env.ATTACHMENTS_DATASET;
const table_Id = process.env.ATTACHMENTS_DATASET_TABLE;
//Upload image to GCS
export const UploadToGCS_BQ = async (file: File) => {
	if (!file) throw new Error("No file uploaded");
	if (file.size < 1) throw new Error("File is empty");
	if (file.size > 3 * 1024 * 1024) throw new Error("File size exceeds 3MB");
	if (!file.type.startsWith("image/")) throw new Error("File is not an image");

	const bufferData = await file.arrayBuffer();
	const image = storage.bucket(process.env.GCS_BUCKET_NAME as string).file(`${process.env.GCS_BUCKET_SUBFOLDER_MEDIA_LOGO_BANNER}/${file.name}`);

	const rows = [
		{
			page_id: take(uuidv4().replace(/-/g, ""), 5).join(""),
			page_name: "media-logo-banner",
			folder_name: `${process.env.GCS_BUCKET_SUBFOLDER_MEDIA_LOGO_BANNER}`,
			files: file.name,
		},
	];
	
	await image.save(Buffer.from(bufferData), {
		public: true,
	});
	await bigquery.dataset(dataset_Id as string).table(table_Id as string).insert(rows);
	return true;
};

//Delete image from GCS bucket subfolder
export const deleteImageFromGCS = async (fileName: string) => {
	const image = storage.bucket(process.env.GCS_BUCKET_NAME as string).file(`${process.env.GCS_BUCKET_SUBFOLDER_MEDIA_LOGO_BANNER}/${fileName}`);
	const [exists] = await image.exists();

	if (exists) {
		await image.delete();
		return true;
	}

	return false;
};
