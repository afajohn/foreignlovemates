"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings } from "lucide-react";



const sidebarNavlinks = [
	{ name: "Dashboard", href: "/dashboard" },
	{ name: "Publish Article", href: "/articles" },
	{ name: "Categories", href: "/categories" },
	{ name: "Page type", href: "/page-types" },
	{ name: "Trash", href: "/trash" },

];


export default function Sidebar({ role }: { role: string }) {
	const pathname = usePathname();


	return (
		<aside className="min-h-screen w-80">
			<ul className="px-4 d-flex flex-col">
				{sidebarNavlinks.map(({ name, href }) => {
					const isActive = pathname === `/afa-admin${href}`;

					return (
						<li key={name}>
							<Link
								href={`/afa-admin/${href}`}
								className={`${isActive
									? "bg-[#ededed] font-bold rounded-md"
									: "text-gray-600 hover:text-gray-900"
									} transition-colors duration-200 inline-block w-full py-2 px-4`}
							>
								{name}
							</Link>
						</li>
					);
				})}
				{(role === 'Admin' || role === 'Developer') &&
					<li className="px-4 py-2">
						<DropdownMenu>
							<DropdownMenuTrigger className="flex gap-2 items-center">
								<Settings size={20} /> Settings{" "}
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-[285px] ml-5">
								{role === 'Admin' && <Link href={"/afa-admin/users"}>
									<DropdownMenuItem className="cursor-pointer">
										Users
									</DropdownMenuItem>
								</Link>}

								{(role === 'Admin' || role === 'Developer') &&
									<>
										<Link href={"/afa-admin/configuration/branding-config"}>
											<DropdownMenuItem className="cursor-pointer">
												Branding Configuration
											</DropdownMenuItem>
										</Link><Link href={"/afa-admin/configuration/homepage-config"}>
											<DropdownMenuItem className="cursor-pointer">
												Hompage Editor
											</DropdownMenuItem>
										</Link>
									</>
								}
							</DropdownMenuContent>
						</DropdownMenu>
					</li>
				}
			</ul>
		</aside>
	);
}