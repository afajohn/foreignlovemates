import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import TAndMCarousel from "./TandMCarousel";
import Link from "next/link";

interface CardTm {
	id: number;
	cardTextTm: string;
	cardUrlTm: string;
	cardImgTm: string;
	cardImgTmPreview: string;
}

interface LiveImgs {
	id: number;
	travImg: string;
	travImgPreview: string;
	travImgTitle :string;
	schedTxt: string;
	linkUrl: string;
}

interface TravelItem {
	liveImg?: LiveImgs[];
	cardsTm?: CardTm[];
}

interface HomePageData {
	travelAndMeet: TravelItem[];
}

async function TravelAndMeet({config}:{config:HomePageData[]}) {
	// Fetch data Array[] START
	const travel: TravelItem[] = Array.isArray(config) && config.length > 2
    ? config[2]?.travelAndMeet || []
    : [];



	return (
		<div className="py-3">
			<div className="pt-0 lg:pt-5 my-0 lg:my-2 flex flex-col lg:flex-row items-center text-start container">
				<div>
					<h2 className="h2-primary">Travel & Meet Her</h2>
					<br />
					<p className="lg:pt-0 mx-3 lg:mb-0 mb-3">
						Whether you&apos;re interested in sharing your own traditions or learning
						about someone else&apos;s. We provide a space where cultural exchange is
						at the heart of every connection.
					</p>
				</div>
			</div>

			<div className="grid lg:grid-cols-2 gap-4 justify-center items-center py-5 px-5 rounded-3xl">
				{/* CAROUSEL LEFT */}
				<TAndMCarousel travel={travel} />
				{/* CARDS RIGHT */}
				<div className="max-w-[28rem] mx-auto py-3">
					<div className="grid lg:grid-rows-1 gap-4">
						{travel.length > 0 &&
						travel[0]?.cardsTm &&
						travel[0].cardsTm.length > 0 ? (
							<div>
								{/* Top Row: 2 Cards */}
								<div className="lg:grid grid-cols-2 gap-4 flex justify-center mb-3">
									{travel[0].cardsTm.slice(0, 2).map((card: CardTm) => (
										<div key={card.id}>
										<Link href={`${card.cardUrlTm}`}>
											<Card className="relative rounded-2xl hover:opacity-90">
												<CardHeader className="absolute inset-0 flex items-center justify-center z-10">
													<CardTitle className="text-white tracking-wide text-md md:text-xl font-semibold">
														{card.cardTextTm}
													</CardTitle>
												</CardHeader>
												<CardContent className="p-0">
													<Image
														src={card.cardImgTm || card.cardImgTmPreview}
														alt={card.cardTextTm}
														loading="lazy"
														width={320}
														height={320}
														className="object-cover rounded-2xl w-full"
													/>
												</CardContent>
											</Card>
										</Link>
										</div>
									))}
								</div>

								{/* Bottom Row: 2 Cards */}
								<div className="lg:grid grid-cols-2 gap-4 flex justify-center mt-3">
									{travel[0].cardsTm.slice(2, 4).map((card: CardTm) => (
										<div key={card.id}>
										<Link href={`${card.cardUrlTm}`}>
											<Card className="relative rounded-2xl hover:opacity-90">
												<CardHeader className="absolute inset-0 flex items-center justify-center z-10">
													<CardTitle className="text-white tracking-wide text-md md:text-xl font-semibold">
														{card.cardTextTm}
													</CardTitle>
												</CardHeader>
												<CardContent className="p-0">
													<Image
														src={card.cardImgTm || card.cardImgTmPreview}
														alt={card.cardTextTm}
														loading="lazy"
														width={320}
														height={320}
														className="object-cover rounded-2xl w-full"
													/>
												</CardContent>
											</Card>
										</Link>
										</div>
									))}
								</div>
							</div>
						) : (
							<p>Loading Travel Meet Card images...</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default TravelAndMeet;
