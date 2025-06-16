import { DynamicIcon } from "lucide-react/dynamic";
import Image from "next/image";
import Link from "next/link";

const socialsLinks = [
	{
		name: "Facebook",
		url: "http://www.facebook.com/therealafa",
		icon: "facebook",
	},
	{
		name: "Instagram",
		url: "http://instagram.com/afatravel",
		icon: "instagram",
	},
	{ name: "Twitter", url: "http://twitter.com/AFA_dating", icon: "twitter" },
];
const footerLinks = [
  {
    name: "Profiles",
    links: [
      {
        name: "Home",
        href: "/#",
      },
      {
        name: "Single Tours",
        href: "#singles-tours",
      },
      {
        name: "Foreign Women Profiles",
        href: "#foreign-women-profiles",
      },
      {
        name: "Foreign Women Search Engine",
        href: "#foreign-women-search-engine",
      },
      {
        name: "Newest Foreign Women Profiles",
        href: "#newest-foreign-women-profiles",
      },
    ],
  },
  {
    name: "Services",
    links: [
      {
        name: "Receive Customer Profile",
        href: "#receive-customer-profile",
      },
      {
        name: "Single Tours",
        href: "#matchmaker-services",
      },
      {
        name: "Foreign Women Profiles",
        href: "#live-webcast",
      },
      {
        name: "Affiliates",
        href: "#affiliates",
      },
    ],
  },
  {
    name: "Policies",
    links: [
      {
        name: "Privacy Policy",
        href: "#privacy-policy",
      },
      {
        name: "Terms and Conditions",
        href: "#terms-and-conditions",
      },
    ],
  },
];
export default function Footer({logo}:{logo:string}) {
  return (
			<footer className="bg-white">
				<div className="lg:mx-auto mx-3 max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
						<div className="flex flex-col items-center lg:items-start justify-center mx-auto lg:mx-0">
							<div>
								<Image
									src={logo || "/images/loveme-v2.png"}
									width={256}
									height={69}
									alt="Brand Logo"
									className="pointer-events-none"
								/>
							</div>
							<div>
								<Image
									src={"/images/contact-img.jpg"}
									width={180}
									height={115}
									alt="Contact Image"
									className="pointer-events-none mt-3"
								/>
							</div>
							<div>
								<ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
									{socialsLinks.map((link) => (
										<li key={link.name}>
											<Link
												data-testid="social-link"
												href={link.url}
												rel="noreferrer noopener"
												target="_blank"
												aria-label={link.name}
												className="text-primary-500 hover:text-secondary-500 transition"
											>
												<DynamicIcon
													data-testid="social-icon"
													name={
														link.icon as "facebook" | "instagram" | "twitter"
													}
													size={24}
												/>
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						<nav className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
							{footerLinks.map((section) => (
								<div
									key={section.name}
									className="text-center sm:text-left"
									data-testid="nav-link-section"
								>
									<p className="text-primary-500 text-lg font-medium">
										{section.name}
									</p>

									<ul className="mt-5 space-y-4 text-sm">
										{section.links.map((link) => (
											<li key={link.name}>
												<Link
													className="text-gray-700 transition hover:text-gray-700/75"
													href={link.href}
												>
													{link.name}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</nav>
					</div>

					<div className="mt-12 border-t border-gray-100 pt-6">
						<div className="text-center sm:flex sm:justify-between sm:text-left">
							<p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
								&copy; Loveme
							</p>
						</div>
					</div>
				</div>
			</footer>
		);
}
