import Image from "next/image";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { getAllDataFromBQ } from "@/_lib/getAllDataFromBQ";

export default async function FetchMediaLogoBanner() {
	const imagesData = await getAllDataFromBQ();
	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>File Name</TableHead>
						<TableHead>Image Preview</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{imagesData.map((image) => (
						<TableRow key={image.page_id}>
							<TableCell className="font-medium">{image.files}</TableCell>
							<TableCell>
								<Image
									src={`https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${image.folder_name}/${image.files}`}
									alt={image.files}
									width={50}
									height={50}
									className="fill object-contain"
								/>
							</TableCell>
							<TableCell className="text-right">Delete</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableCaption>A list of your recent uploaded images.</TableCaption>
			</Table>
		</>
	);
}
