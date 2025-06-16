import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import PricingButton from "./PricingButton";
import { BadgeCheck, Info } from "lucide-react";
import parser from "html-react-parser";
import Link from "next/link";

interface PricingItem {
	price_id: string;
	price: string;
	btn_url: string;
	button_text: string;
	tittle: string;
	price_details: PricingDetail[];
	view_more_url: string;
}
interface PricingDetail {
	details_id: string;
	paragraph: string;
}

async function getPricing() {
	try {
		const res = await fetch("http://loveme.local/api/configuration/homepage?section=pricing", {
			next: { revalidate: 7200 },
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch homepage CRUD data. Status: ${res.status}`);
		}
		const data = await res.json();
		return data;

	} catch (error) {
		console.error("Error fetching homepage CRUD data:", error);
		return null;
	}
}

const Pricing = async () => {

	const config1 = await getPricing()
	const pricing = config1 || [];
	const pricingItem = pricing?.data[0];
	const pricingItem1 = pricing?.data[1];
	const pricingItem2 = pricing?.data[2];
	const pricingItem3 = pricing?.data[3];


	return (
		<div className="w-11/12 md:w-4/5 mx-auto p-4 md:p-8">
			{/* Buttons Section */}
			<div className="flex justify-center items-center mb-16 relative">
				<PricingButton />
			</div>

			{/* Pricing Cards Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

				{/* Card 1 */}
				<Accordion type="single" collapsible className="w-full">
					<div className="border p-6 rounded-2xl shadow-2xl flex flex-col items-center bg-[#F5F5F5]">
						<p className="font-semibold text-sm md:text-base">Starts at</p>
						<p className="text-primary-500 py-3 font-black text-5xl">
							${pricingItem.price}
						</p>
						<Link className="bg-primary-500 hover:bg-primary-400 w-full text-sm px-4 py-2 mt-4 text-white rounded-full" href={`${pricingItem.btn_url}`}>
							{pricingItem.button_text || ''}
						</Link>
						<h3 className="mt-4 text-center font-semibold text-lg md:text-xl text-nowrap">
							{pricingItem.tittle}
						</h3>

						<AccordionItem value={"details-0"}>
							<AccordionTrigger className="justify-center">
								See details here
							</AccordionTrigger>
							<AccordionContent>
								<div>
									<ul className="flex flex-col gap-3 items-start text-start justify-start bg-gray-100 border border-gray-300 p-3 rounded-xl">
										{pricingItem?.price_details?.length > 0 ? (
											pricingItem?.price_details?.map((detail: PricingDetail) => (
												<li key={detail.details_id} className="inline-flex space-x-2">
													<div>
														<BadgeCheck className="text-primary-600" />
													</div>
													<p>{parser(detail?.paragraph || '')}</p>
												</li>
											))
										) : (
											<p>No details available</p>
										)}
									</ul>
								</div>
							</AccordionContent>
						</AccordionItem>
						<Link
							href={`${pricingItem.view_more_url}`}
							className="w-full px-4 py-2 mt-4 flex items-center justify-center text-gray-700 hover:text-gray-500"
						>
							<Info className="w-5 h-5 mr-2" />
							<span>Click Here to View More</span>
						</Link>
					</div>
				</Accordion>

				{/* Card 2 */}
				<Accordion type="single" collapsible className="w-full">
					<div className="border p-6 rounded-2xl shadow-2xl flex flex-col items-center bg-[#F5F5F5]">
						<p className="font-semibold text-sm md:text-base">Starts at</p>
						<p className="text-primary-500 py-3 font-black text-5xl">
							${pricingItem1.price}
						</p>
						<Link className="bg-primary-500 hover:bg-primary-400 w-full text-sm px-4 py-2 mt-4 text-white rounded-full" href={`${pricingItem1.btn_url}`}>
							{pricingItem1.button_text || ''}
						</Link>
						<h3 className="mt-4 text-center font-semibold text-lg md:text-xl text-nowrap">
							{pricingItem1.tittle}
						</h3>

						<AccordionItem value={"details-0"}>
							<AccordionTrigger className="justify-center">
								See details here
							</AccordionTrigger>
							<AccordionContent>
								<div>
									<ul className="flex flex-col gap-3 items-start text-start justify-start bg-gray-100 border border-gray-300 p-3 rounded-xl">
										{pricingItem1?.price_details?.length > 0 ? (
											pricingItem1?.price_details?.map((detail: PricingDetail) => (
												<li key={detail.details_id} className="inline-flex space-x-2">
													<div>
														<BadgeCheck className="text-primary-600" />
													</div>
													<p>{parser(detail?.paragraph || '')}</p>
												</li>
											))
										) : (
											<p>No details available</p>
										)}
									</ul>
								</div>
							</AccordionContent>
						</AccordionItem>
						<Link
							href={`${pricingItem1.view_more_url}`}
							className="w-full px-4 py-2 mt-4 flex items-center justify-center text-gray-700 hover:text-gray-500"
						>
							<Info className="w-5 h-5 mr-2" />
							<span>Click Here to View More</span>
						</Link>
					</div>
				</Accordion>

				{/* Card 3 */}
				<Accordion type="single" collapsible className="w-full">
					<div className="relative overflow-hidden bg-white border p-6 rounded-2xl shadow-2xl flex flex-col items-center ">
							<div className="absolute right-0 top-0 h-16 w-16">
								<div className="absolute transform rotate-45 text-center bg-secondary-700 text-white text-sm font-semibold py-1 right-[-40px] top-[32px] w-[170px]">
									Most Popular
								</div>
							</div>
						<p className="font-semibold text-sm md:text-base">Starts at</p>
						<p className="text-primary-500 py-3 font-black text-5xl">
							${pricingItem2.price}
						</p>
						<Link className="w-full px-4 py-2 mt-4 bg-secondary-500 hover:bg-secondary-600 text-white text-sm text-nowrap rounded-full" href={`${pricingItem2.btn_url}`}>
							{pricingItem2.button_text || ''}
						</Link>
						<h3 className="mt-4 text-center font-semibold text-lg md:text-xl text-nowrap">
							{pricingItem2.tittle}
						</h3>

						<AccordionItem value={"details-0"}>
							<AccordionTrigger className="justify-center">
								See details here
							</AccordionTrigger>
							<AccordionContent>
								<div>
									<ul className="flex flex-col gap-3 items-start text-start justify-start bg-gray-100 border border-gray-300 p-3 rounded-xl">
										{pricingItem2?.price_details?.length > 0 ? (
											pricingItem2?.price_details?.map((detail: PricingDetail) => (
												<li key={detail.details_id} className="inline-flex space-x-2">
													<div>
														<BadgeCheck className="text-primary-600" />
													</div>
													<p>{parser(detail?.paragraph || '')}</p>
												</li>
											))
										) : (
											<p>No details available</p>
										)}
									</ul>
								</div>
							</AccordionContent>
						</AccordionItem>
						<Link
							href={`${pricingItem2.view_more_url}`}
							className="w-full px-4 py-2 mt-4 flex items-center justify-center text-gray-700 hover:text-gray-500"
						>
							<Info className="w-5 h-5 mr-2" />
							<span>Click Here to View More</span>
						</Link>
					</div>
				
				</Accordion>

				{/* Card 4 */}
				<Accordion type="single" collapsible className="w-full">
					<div className="border p-6 rounded-2xl shadow-2xl flex flex-col items-center bg-[#F5F5F5]">
						<p className="font-semibold text-sm md:text-base">Starts at</p>
						<p className="text-primary-500 py-3 font-black text-5xl">
							${pricingItem3.price}
						</p>
						<Link className="bg-primary-500 hover:bg-primary-400 w-full text-sm px-4 py-2 mt-4 text-white rounded-full" href={`${pricingItem3.btn_url}`}>
							{pricingItem3.button_text || ''}
						</Link>
						<h3 className="mt-4 text-center font-semibold text-lg md:text-xl text-nowrap">
							{pricingItem3.tittle}
						</h3>

						<AccordionItem value={"details-0"}>
							<AccordionTrigger className="justify-center">
								See details here
							</AccordionTrigger>
							<AccordionContent>
								<div>
									<ul className="flex flex-col gap-3 items-start text-start justify-start bg-gray-100 border border-gray-300 p-3 rounded-xl">
										{pricingItem3?.price_details?.length > 0 ? (
											pricingItem3?.price_details?.map((detail: PricingDetail) => (
												<li key={detail.details_id} className="inline-flex space-x-2">
													<div>
														<BadgeCheck className="text-primary-600" />
													</div>
													<p>{parser(detail?.paragraph || '')}</p>
												</li>
											))
										) : (
											<p>No details available</p>
										)}
									</ul>
								</div>
							</AccordionContent>
						</AccordionItem>
						<Link
							href={`${pricingItem3.view_more_url}`}
							className="w-full px-4 py-2 mt-4 flex items-center justify-center text-gray-700 hover:text-gray-500"
						>
							<Info className="w-5 h-5 mr-2" />
							<span>Click Here to View More</span>
						</Link>
					</div>
				</Accordion>
			</div>
		</div>
	);
};

export default Pricing;
