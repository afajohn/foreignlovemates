"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, House, User, UserPlus, Venus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SignUpModal from "../signUpModal";
import LoginModal from "../loginModal";

interface MobileNavProps {
	mobileLogo:string;
	logo:string
}

function MobileNav({mobileLogo,logo}:MobileNavProps) {
	// Function for scrolly fixed bottom/top nav
	const [showBottom, setShowBottom] = useState(false);
	const [showTop, setShowTop] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	useEffect(() => {
		const handleScroll = () => {
			if (typeof window !== "undefined") {
				const currentScrollY = window.scrollY;

				if (currentScrollY < 50) {
					setShowTop(true); 
				} else if (currentScrollY < lastScrollY) {
					setShowTop(true); 
				} else {
					setShowTop(false);
				}
		
				if (currentScrollY < lastScrollY) {
					setShowBottom(false); 
				} else {
					setShowBottom(true);
				}
				setLastScrollY(currentScrollY);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollY]);

	return (
		<>
			<div
				id="mobileNav"
				className={`lg:hidden fixed bg-white py-3 shadow z-30 top-0 left-0 w-full transition-all duration-300 ${
					showTop ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<div className="flex flex-row justify-between">
					<div className="flex flex-row items-center ml-2" id="mobile-left">
						<Sidebar />
						<div className="ml-3">
							<span className="tracking-tight hidden md:flex">
								<Link href={"/"}>
									<Image
										src={logo || "/images/loveme-v2.png"}
										alt="Love Me Logo"
										width={200}
										height={65}
										className="max-w-[12rem]"
									/>
								</Link>
							</span>
							<span className="tracking-tight md:hidden">
								<Link href={"/"}>
									<Image
										 src={mobileLogo || "/images/loveme-v2.png"}
										alt="Love Me Logo"
										width={150}
										height={150}
										className="w-[3rem]"
									/>
								</Link>
							</span>
						</div>
					</div>

					<div className="flex flex-row items-center text-sm" id="mobile-right">
						<div className="mx-1">
							<Dialog>
								<DialogTrigger asChild>
									
									<button type="button" className="py-2 text-nowrap inline-flex items-center space-x-2">
										<User className="h-5 w-5" />
										<span className="mx-auto">Sign In</span>
									</button>
								</DialogTrigger>

								<LoginModal />
							</Dialog>
						</div>
						<div className="mx-1 ">
							{/* Sign up modal Mobile Reusable Modal */}
							<Dialog>
								<DialogTrigger className="primary-btn inline-flex space-x-2">
									Create Account
								</DialogTrigger>
								<SignUpModal />
							</Dialog>
						</div>
					</div>
				</div>

				<ul className="flex flex-row justify-evenly text-nowrap gap-2 pt-2 font-bold">
					<li>Eropean Women</li>
					<li>Asian Women</li>
					<li>Latin Women</li>
				</ul>
			</div>

			<div
				id="fixedBottom-nav"
				className={`lg:hidden fixed z-50 bottom-0 left-0 w-full transition-all duration-300 ${
					showBottom ? "translate-y-full" : "-translate-y-0"
				}`}
			>
				<div className="bg-[#530505] py-3 px-3">
					<div>
						<ul className="flex flex-row items-center justify-between md:justify-around text-sm text-white">
							<li>
								
								<button type="button">
									<div className="flex flex-col items-center">
										<House className="mb-2" />
										<p>Home</p>
									</div>
								</button>
							</li>
							<li>
								
								<button type="button">
									<div className="flex flex-col items-center">
										<CalendarDays className="mb-2" />
										<p>Tour Schedule</p>
									</div>
								</button>
							</li>
							<li>
								
								<button type="button">
									<div className="flex flex-col items-center">
										<Venus className="mb-2" />
										<p>Newest Ladies</p>
									</div>
								</button>
							</li>
							<li>
								
								<button type="button">
									<div className="flex flex-col items-center">
										<UserPlus className="mb-2" />
										<p>Free Sign-up</p>
									</div>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default MobileNav;
