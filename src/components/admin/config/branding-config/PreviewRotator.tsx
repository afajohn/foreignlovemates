import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { BadgeCheck } from "lucide-react"; 
import Image from "next/image"; 
import { useConfigHooks } from '@/hooks/admin';
import { useConfigStore } from '@/store/useConfigStore';


const PreviewRotator = () => {
    const [ladiesData, setLadiesData] = useState<{ random_value: number }[]>([]);
    const {selectedSite}= useConfigStore();
	const {fetchRotator}= useConfigHooks();

	useEffect(() => {
		if (selectedSite) {
		  const fetchData = async () => {
			const data = await fetchRotator();
			if (data) {
			  setLadiesData(data);
			}
		  };
		  fetchData();
		}
	  }, [selectedSite, fetchRotator]); 
	  


    
  return (
    <section
			id="rotatorPreview"
			className="bg-gray-50 flex items-center justify-center py-4"
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
											className="rounded-full lg:rounded-xl object-cover object-top lg:w-[100px] lg:h-[150px] w-24 h-24"
											priority={true}
											width={100}
											height={150}
										/>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</section>
  )
}

export default PreviewRotator