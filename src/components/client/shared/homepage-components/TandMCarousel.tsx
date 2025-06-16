'use client'
import React, { useState } from 'react'
import Autoplay from "embla-carousel-autoplay";
import { Radio } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
	travImgTitle: string;
	schedTxt: string;
	linkUrl: string;
}

interface TravelItem {
	liveImg?: LiveImgs[];
	cardsTm?: CardTm[];
}


const TAndMCarousel = ({ travel }: { travel: TravelItem[] }) => {

	// For Carousel
	const plugin = React.useRef(
		Autoplay({
			delay: 8000,
		}),
	);

	const [isGrabbing, setIsGrabbing] = useState(false);



	return (
		<div>
			<Carousel
				plugins={[plugin.current]}
				className="max-w-[34rem] mx-auto"
				onMouseEnter={plugin.current.stop}
				onMouseLeave={plugin.current.reset}
				opts={{
					loop: true,
				}}
			>
				<CarouselContent className="mx-auto py-3">
					{travel.length > 0 &&
						travel[0]?.liveImg &&
						travel[0].liveImg.length > 0 ? (
						travel[0].liveImg.map((img) => (
							<CarouselItem key={img.id}
								className="mx-auto"
							>
								<Link href={`${img.linkUrl}`} className="relative">
									<Card
										onMouseDown={() => setIsGrabbing(true)}
										onMouseUp={() => setIsGrabbing(false)}
										className={`relative border-0 ${isGrabbing ? "cursor-grabbing" : "cursor-grab"
											}`}
									>
										<CardHeader className="absolute inset-0 flex items-center justify-center z-10">
											<CardTitle className="text-white tracking-wide text-xl md:text-3xl font-semibold">
												{img.travImgTitle}
											</CardTitle>
										</CardHeader>
										<CardContent className="p-0">
											<Image
												src={img.travImg || img.travImgPreview}
												width={615}
												height={615}
												alt={`Live Image - ${img.id}`}
												loading='lazy'
												className="rounded-2xl m-auto w-[615px] h-auto"
											/>
											<div className="absolute bottom-1/4 left-1 md:left-1/4 right-1 md:right-1/4 text-white">
												<span className="text-sm md:text-lg">{img.schedTxt}</span>
											</div>
											<div className="absolute mx-10 py-3 top-0 text-red-600">
												<span className="text-xl md:text-3xl font-bold inline-flex items-center space-x-2">
													LIVE <Radio className="w-8 h-8 ml-2" />
												</span>
											</div>
										</CardContent>
									</Card>
								</Link>
							</CarouselItem>
						))
					) : (
						<p>Loading Travel Meet Live images...</p>
					)}
				</CarouselContent>

				<CarouselPrevious className="left-5 md:left-10" />
				<CarouselNext className="right-5 md:right-10" />
			</Carousel>
		</div>
	)
}

export default TAndMCarousel
