import { getAllDataFromBQ } from "@/_lib/getAllDataFromBQ";
import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";

export default async function ImageBannerLogo() {
	const imagesData = await getAllDataFromBQ().catch((error) => {
		console.error("Failed to fetch images data from BigQuery:", error);
		return []; // Return a fallback empty array to prevent crashes
	  });
	  
	return (
		<div className="lg:w-1/2 w-full relative">
			<Marquee className="[--duration:20s] will-change-transform">
				{
					imagesData.map((image) => (
						<Image
							key={image.page_id}
							src={`https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${image.folder_name}/${image.files}`}
							alt={image.files}
							width={50}
							height={50}
							className="fill object-contain pointer-events-none"
						/>
					))
				}
				{/* {imagesData.map((image) => (
					<Image
						key={image.page_id}
						src={`https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${image.folder_name}/${image.files}`}
						alt={image.files}
						width={50}
						height={50}
						className="fill object-contain pointer-events-none"
					/>
				))} */}
			</Marquee>
			<div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gray-50" />
			<div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-50" />
		</div>
	);
}
