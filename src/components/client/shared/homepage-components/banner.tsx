import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BannerDetails {
	id: number;
	bannerLogo: string;
	bannerIntroTxt: string;
	bannerImgPreview: string;
}
interface BannerCard {
	id: number;
	cardText: string;
	cardUrl: string;
	cardImg: string;
	cardImgPreview: string;
}

interface BannerItem {
	bannerH1?: string;
	introVideoThumbnail?: string;
	introVideo?: string;
	introVideoPreview?: string;
	bannerDetails?: BannerDetails[];
	cards?: BannerCard[];
}

interface HomePageData {
	banner: BannerItem[];
}

async function Banner({ config }: { config: HomePageData[] }) {

	const banner: BannerItem[] = Array.isArray(config) && config.length > 1
		? config[1]?.banner || []
		: [];


	return (
		<>
			{/* Section Heading */}
			{banner[0]?.bannerH1 && (
				<h1 className="h1-primary col-span-2 mt-2">{banner[0].bannerH1}</h1>
			)}
			{/* Left Container */}
			<div className="p-6 flex lg:flex-col flex-col-reverse items-center justify-start ">
				{banner.length > 0 && (
					<div className="flex flex-col items-center">
						{banner[0].bannerDetails?.map((item) => (
							<div key={item.id}>
								{/* Logo */}
								<Card className="h-[65px] bg-transparent border-none">
									<Image
										src={item.bannerLogo || item.bannerImgPreview}
										alt="AFA Logo"
										width={260}
										height={65}
										loading="lazy"
										className="mx-auto w-[260px] h-auto"
									/>
								</Card>
								{/* Paragraph */}
								<p className="text-center text-gray-800 lg:pt-0 pt-3 lg:text-md lg:px-5 mb-4">
									{item.bannerIntroTxt}
								</p>
							</div>
						))}
					</div>
				)}
				{/* Embedded Video */}
				<div className="relative pb-3">
					{banner[0]?.introVideo && banner[0]?.introVideoThumbnail && (
						<Card className="2xl:h-[362px] 2xl:w-[580px] xl:h-[355px] xl:w-[568px] lg:h-[275px] lg:w-[440px] md:h-[362px] md:w-[580px] sm:h-[350px] sm:w-[560px] min-h-[175px] min-w-[280px] border-none">
							<HeroVideoDialog
								className="block dark:hidden max-w-[40rem]"
								animationStyle="from-center"
								videoSrc={banner[0].introVideo}
								thumbnailSrc={`${banner[0].introVideoThumbnail || banner[0].introVideoPreview}`}
								thumbnailAlt="Intro Video"
							/>

						</Card>
					)}
				</div>
				<p className="text-md">View Intro Video</p>
			</div>

			{/* Right Container */}
			<div>
				<h2 className="h3-tertiary inline-flex space-x-2 lg:pt-10">
					<BadgeCheck className=" w-6 h-6 mr-3 lg:mt-1" />
					Ladies Profiles Verified IN PERSON!
				</h2>

				<div className="lg:grid grid-rows-2 gap-4 py-5 mx-auto max-w-[40rem]">
					{/* Top Row: 2 Cards */}
					{banner.length > 0 ? (
						<div className="lg:grid grid-cols-2 gap-4 flex justify-center lg:mb-0 mb-5">
							{banner[0].cards?.slice(0, 2).map((card: BannerCard) => (
								<div key={card.id} >
									<Link href={`${card.cardUrl}`}>
										<Card className="relative rounded-2xl hover:opacity-90 2xl:h-[212px] xl:h-[204px] lg:h-[161px]">
											<CardHeader className="absolute inset-0 flex items-center justify-center z-10">
												<CardTitle className="text-white tracking-wide text-md md:text-xl font-semibold">
													{card.cardText}
												</CardTitle>
											</CardHeader>
											<CardContent className="p-0">
												<div className="absolute inset-0 bg-black opacity-50 z-0 rounded-2xl" />
												<Image
													src={card.cardImg || card.cardImgPreview}
													alt={card.cardText}
													width={350}
													height={350}
													loading="lazy"
													className=" object-cover rounded-2xl w-[350px] h-auto"
												/>
											</CardContent>
										</Card>
									</Link>
								</div>
							))}
						</div>
					) : (
						<p>Loading Banner...</p>
					)}
					{/* Bottom Row: 2 Cards */}
					{banner.length > 0 && (
						<div className="lg:grid grid-cols-2 gap-4 flex justify-center lg:mb-0 mb-5">
							{banner[0].cards?.slice(2, 4).map((card: BannerCard) => (
								<div key={card.id}>
									<Link href={`${card.cardUrl}`}>
										<Card className="relative rounded-2xl hover:opacity-90 2xl:h-[212px] xl:h-[204px] lg:h-[161px] ">
											<CardHeader className="absolute inset-0 flex items-center justify-center z-10">
												<CardTitle className="text-white tracking-wide text-md md:text-xl font-semibold">
													{card.cardText}
												</CardTitle>
											</CardHeader>
											<CardContent className="p-0">
												<div className="absolute inset-0 bg-black opacity-50 z-0 rounded-2xl" />
												<Image
													src={card.cardImg || card.cardImgPreview}
													alt={card.cardText}
													width={350}
													height={350}
													loading="lazy"
													className=" object-cover rounded-2xl w-[350px] h-auto"
												/>
											</CardContent>
										</Card>
									</Link>
								</div>
							))}
						</div>
					)}
				</div>
				<p className="text-md">
					The Highest Verification - Fraud Prevention Standards in the Industry!
				</p>
			</div>
		</>
	);
}

export default Banner;
