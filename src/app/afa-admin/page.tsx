"use client";
import { usePathname, redirect } from "next/navigation";
import { useEffect } from "react";

export default function AfaAdminPage() {
	const pathname = usePathname();

	useEffect(() => {
		if (pathname === "/afa-admin") {
			redirect("/afa-admin/dashboard");
		}
	}, [pathname]);
}
