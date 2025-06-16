import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getHomePageCrudData } from "@/_lib/fetch-data";
import Link from "next/link";

interface ExecutiveImg {
	id: number;
	execImg: string;
	execUrl: string;
	execImgPreview: string;
	execTitle: string;
	execTxt: string;
}

interface CardsExec {
	id: number;
	cardTextExec: string;
	cardUrlExec:string;
	cardImgExec: string;
	cardImgExecPreview: string;
}


interface ExecutiveItems {
	executiveImg?: ExecutiveImg[];
	cardsExec?: CardsExec[];
}

interface HomePageData {
	executivePlan: ExecutiveItems[];
}
async function Services() {
	
	const config: HomePageData[] = await getHomePageCrudData().catch((error) => {
		console.error("Failed to fetch homepage data:", error);
		return []; // Ensures `config` is always an array
	});
	
	const executive: ExecutiveItems[] | undefined = config?.[3]?.executivePlan;
	
	  


	return (
		<>
    <div>
    <h2 className="h2-primary pt-2">Service Options We Offer</h2>
    </div>
			<div className="lg:grid grid-cols-2 gap-4 w-full pt-5 container mx-auto">
				{/* Left Container */}
				<div className="rounded-lg py-5 flex items-center justify-center">
					{executive && executive.length > 0 && executive[0].executiveImg ? (
						executive.map((execItem) =>
							execItem.executiveImg?.map((img) => (
								<div key={img.id} className="max-w-[20rem]">
									<Link href={`${img.execUrl}`}>
										<Card className="relative rounded-2xl hover:opacity-90">
											<CardHeader className="absolute inset-0 flex items-center justify-center z-10">
												<CardTitle className="text-white tracking-wider text-md md:text-xl font-semibold">
													{img.execTitle}
												</CardTitle>
												<CardDescription className="text-white">
													{img.execTxt}
												</CardDescription>
											</CardHeader>

											<CardContent className="p-0">
												<div className="absolute inset-0 bg-gray-900 opacity-50 z-0 rounded-2xl" />
												<Image
													src={img.execImg || img.execImgPreview}
													alt={img.execTitle}
													loading="lazy"
													width={670}
													height={670}
													className="w-[670px] h-auto object-cover rounded-2xl"
												/>
											</CardContent>
										</Card>
									</Link>
								</div>
							)),
						)
					) : (
						<p>Loading Executive Image items...</p>
					)}
				</div>

				{/* Right Container */}
				<div className="mx-5 md:mx-0">
					<div className="lg:grid grid-rows-2 gap-4 lg:py-5 lg:px-5 lg:my-5 max-w-[40rem]">
						{/* Top Row: 2 Cards */}
						<div className="lg:grid grid-cols-2 gap-4 flex justify-center lg:mb-0 mb-5">
							{executive && executive.length > 0 && executive[0].cardsExec ? (
								executive[0].cardsExec.slice(0, 2).map((card) => (
									<div key={card.id}>
									<Link href={`${card.cardUrlExec}`}>
										<Card className="relative rounded-2xl hover:opacity-90">
											<CardHeader className="absolute inset-0 flex items-center justify-center z-10">
												<CardTitle className="text-white tracking-wider text-md md:text-xl font-semibold">
													{card.cardTextExec}
												</CardTitle>
											</CardHeader>
											<CardContent className="p-0">
												<div className="absolute inset-0 bg-gray-900 opacity-50 z-0 rounded-2xl" />
												<Image
													src={card.cardImgExec || card.cardImgExecPreview}
													alt={card.cardTextExec}
													loading="lazy"
													width={350}
													height={350}
													className="w-[350px] h-auto object-cover rounded-2xl"
												/>
											</CardContent>
										</Card>
									</Link>
									</div>
								))
							) : (
								<p>Loading SERVICE Image top items...</p>
							)}
						</div>

						{/* Bottom Row: 2 Cards */}
						<div className="lg:grid grid-cols-2 gap-4 flex justify-center lg:mb-0 mb-5">
							{executive && executive.length > 0 && executive[0].cardsExec ? (
								executive[0].cardsExec.slice(2, 4).map((card) => (
									<div key={card.id}>
									<Link href={`${card.cardUrlExec}`}>
										<Card className="relative rounded-2xl hover:opacity-90">
											<CardHeader className="absolute inset-0 flex items-center justify-center z-10">
												<CardTitle className="text-white tracking-wider text-md md:text-xl font-semibold">
													{card.cardTextExec}
												</CardTitle>
											</CardHeader>
											<CardContent className="p-0">
												<div className="absolute inset-0 bg-gray-900 opacity-50 z-0 rounded-2xl" />
												<Image
													src={card.cardImgExec || card.cardImgExecPreview}
													alt={card.cardTextExec}
													loading="lazy"
													width={350}
													height={350}
													className="w-[350px] h-auto object-cover rounded-2xl"
												/>
											</CardContent>
										</Card>
									</Link>
									</div>
								))
							) : (
								<p>Loading SERVICE Image bottom items...</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Services;
