"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HandleImgUpload() {
	const [image, setImage] = useState<string | null>(null);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setImage(URL.createObjectURL(e.target.files[0]));
		}
	};
	return (
		<>
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input
					id="picture"
					name="file"
					type="file"
					accept="image/*"
					onChange={handleImageUpload}
					multiple
				/>

				<Button variant={"outline"} type="submit" disabled={!image}>
					<span className="text-sm font-medium leading-none">Upload Image</span>
				</Button>
			</div>
		</>
	);
}
