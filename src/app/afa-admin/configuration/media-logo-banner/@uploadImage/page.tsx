import FetchMediaLogoBanner from "@/components/admin/config/media-logo-config/fetchMediaLogoBanner";
import MediaLogoBanner from "@/components/admin/config/media-logo-config/MediaLogoForm";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Settings2 } from "lucide-react";
import React from "react";

export default function Page() {
	return (
		<div className="flex items-center justify-between">
			<h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
				Media Logo Banner Config
			</h1>
			<Dialog>
				<DialogTrigger className="flex items-center space-x-2 text-sm font-medium leading-none">
					<Settings2 />
					<span>Settings</span>
				</DialogTrigger>
				<DialogContent className="max-w-3xl h-[50vh]">
					<DialogHeader className="flex justify-between items-center flex-row pt-5 space-y-0">
						<DialogTitle className="text-nowrap">
							Media Logo Banner Config
						</DialogTitle>
						<MediaLogoBanner />
					</DialogHeader>
					<FetchMediaLogoBanner />
				</DialogContent>
			</Dialog>
		</div>
	);
}
