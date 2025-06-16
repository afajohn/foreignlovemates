import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { BadgeCheck } from "lucide-react"; // Import the badge-check icon
import Image from "next/image"; // For optimized image rendering

interface RotatorProps {
	ladiesData: { random_value: number }[]; // Adjust the type to match the data structure
}

const Rotator = ({ ladiesData }: RotatorProps) => {
	return (
		<section
			id="rotator"
			className="bg-gray-50 flex items-center justify-center py-4 mx-3"
		>
			<Carousel
				opts={{
					loop: true,
					dragFree: true,
				}}
				className="overflow-hidden flex items-center justify-center"
			>
				<CarouselContent>
					{ladiesData.map((lady: { random_value: number }, index) => (
						<CarouselItem key={lady.random_value} className="basis-1/8">
							<div className="p-1 relative">
								{/* Card */}
								<Card className="border-0 shadow-white">
									{/* Image Wrapper */}
									<CardContent className="p-0 relative">
										{/* Badge Icon (Positioned absolute inside the CardContent) */}
										<div className="absolute top-2 right-2 z-10">
											<BadgeCheck className="text-secondary-500 w-6 h-6 hidden lg:block" />
										</div>
										{/* Image */}
										<Image
											src={`https://loveme.com/mp/p${lady.random_value}-1.jpg`}
											alt={`Image ${index + 1}`}
											className="rounded-full lg:rounded-xl object-cover object-top lg:w-[135px] lg:h-[200px] w-24 h-24"
											width={147}
											height={221}
										/>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</section>
	);
};

export default Rotator;
