export default async function MediaLogoBannerLayout({
	children,
	fetchImageBanner,
	uploadImage,
}: { children: React.ReactNode; fetchImageBanner: React.ReactNode, uploadImage: React.ReactNode }) {
	return (
		<>
			<div>{children}</div>
			<div>{uploadImage}</div>
			<div>{fetchImageBanner}</div>
		</>
	);
}
