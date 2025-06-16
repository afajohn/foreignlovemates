

import { Label } from "@/components/ui/label";
import Form from "next/form";
import HandleImgUpload from "./handle-img-upload";
import { submitUploadToGCSAction } from "@/_lib/action";

export default async function MediaLogoBanner() {
	return (
		<>
			<Form
				className="grid w-full max-w-sm items-center gap-1.5"
				action={submitUploadToGCSAction}
				formEncType="multipart/form-data"
			>
				<Label htmlFor="picture" className="sr-only">Picture</Label>
				<HandleImgUpload />
			</Form>
		</>
	);
}
