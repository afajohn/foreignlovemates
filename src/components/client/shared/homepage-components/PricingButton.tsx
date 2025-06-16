'use client'
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
import React, { useState } from 'react'
import SignUpModal from '../signUpModal';

const PricingButton = () => {
	const [activeButton, setActiveButton] = useState("register");
	const urls = ["/platinum-membership1", "/register"]
	const [currentUrl] = useState(urls);
	return (
		<div className='flex'>
			<Dialog>
				<DialogTrigger onClick={() => setActiveButton("register")}
					className={`shadow-lg px-6 py-3 hover:bg-[#515050]/50 hover:text-black rounded-full ${activeButton === "register"
						? "bg-[#515050] text-white"
						: "bg-white text-black"
						}`}
					style={{
						position: "relative",
						zIndex: activeButton === "register" ? 2 : 1, // Ensure active button is on top
						marginRight: "-60px", // Overlap the edge
					}}>
					Register For Free
				</DialogTrigger>

				<SignUpModal />
			</Dialog>
			{currentUrl ? (
			<Link
				href={currentUrl[0]}
				type="button"
				onClick={() => setActiveButton("upgrade")}
				className={`shadow-lg px-6 py-3 hover:bg-[#515050]/50 hover:text-black rounded-full ${activeButton === "upgrade"
					? "bg-[#515050] text-white"
					: "bg-white text-black"
					}`}
				style={{
					position: "relative",
					zIndex: activeButton === "upgrade" ? 2 : 1, // Ensure active button is on top
				}}
			>
				Upgrade to Platinum Membership
			</Link>
			     ) : (
					<p>Loading Pricing Btn...</p>
				  )}
		</div>
	)
}

export default PricingButton;