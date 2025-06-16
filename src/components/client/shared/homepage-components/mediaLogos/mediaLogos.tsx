import ImageBannerLogo from "./image-banner-logo";

async function MediaLogos() {
	return (
		<>
			<div className="container lg:flex flex-row items-center justify-evenly mx-auto">
				<div className="lg:mb-0 mb-3">
					<h2 className="h2-primary">Featured in Major Media Since 1995</h2>
				</div>
				<ImageBannerLogo />
			</div>
		</>
	);
}

export default MediaLogos;
