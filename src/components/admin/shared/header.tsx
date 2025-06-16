// import Link from "next/link";
import Logo from "@/components/client/logo/Logo";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import type { Session } from "next-auth";
import { Separator } from "@/components/ui/separator";
import LogoutButton from "./LogoutButton";



interface HeaderProps {
	session: Session | null;
  }

export default function Header({ session }: HeaderProps) {
	const user= session?.user;
	
	return (
		<header>
			<nav className="flex justify-between w-full p-4 items-center">
				<Link href="/afa-admin">
					<Logo
						src={"/images/loveme-v1.png"}
						alt={"Love Me Logo"}
						width={125}
						height={125}
					/>
				</Link>
				<ul className="flex gap-3 items-center">
					<li>
						{session?.user && (
							<Image
								src={session.user.image || ""}
								alt="avatar"
								width={30}
								height={30}
								className="rounded-full"
							/>
						)}
					</li>
					<li>Hi! {user?.name} </li>
						<Separator orientation="vertical" className="h-8"/>
					<li>
						<LogoutButton/>
					</li>
				</ul>
			</nav>
		</header>
	);
}
