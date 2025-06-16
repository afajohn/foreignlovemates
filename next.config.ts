import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	env:{
		NEXTAUTH_URL: process.env.NEXTAUTH_URL
	},
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
			{
				protocol: "https",
				hostname: "lh7-rt.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
			},
			{
				protocol: "https",
				hostname: "foreignlovemates.com",
			},
		],

	},


	async rewrites() {
		return [
		  // ✅ Ensure category pages are still available under /blog/:category
		  {
			source: "/blog/:category",
			destination: "/blog/:category", // Leaves category pages unchanged
		  },
		  // ✅ Rewrite blog post URLs
		  {
			source: "/:category/:slug",
			destination: "/blog/:category/:slug", // Maps clean URL to actual structure
		  },
		];
	  },

};

export default nextConfig;
