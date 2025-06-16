"use client";

import { toast } from "sonner";

export async function submitUploadToGCSAction(formData: FormData): Promise<void> {
	const files = formData.getAll("file") as File[];

	// Prevent files larger than 3MB from being submitted
	for (const file of files) {
		if (file.size > 3 * 1024 * 1024) {
			toast.error(`File "${file.name}" exceeds 3MB. Please upload a smaller file.`);
			return;
		}
	}

	try {
		const uploadPromises = files.map(async (file) => {
			const individualFormData = new FormData();
			individualFormData.append("file", file);

			const response = await fetch("/api/configuration/media-logo-banner", {
				method: "POST",
				body: individualFormData,
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Upload failed");
			}

			return data;
		});

		await Promise.all(uploadPromises);

		toast.success("All files uploaded successfully!");
		// return results;
	} catch (error) {
		toast.error("Something went wrong. Please try again.");
		throw error;
	}
}
