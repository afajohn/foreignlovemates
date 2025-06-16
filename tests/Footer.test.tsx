import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/client/shared/footer";
import { DynamicIcon } from "lucide-react/dynamic";
import { each } from "lodash";
import type { ComponentProps } from "react";

vi.mock("lucide-react/dynamic", () => ({
	DynamicIcon: ({ name, size }: ComponentProps<typeof DynamicIcon>) => (
		<svg
			data-testid="dynamic-icon"
			aria-label={name}
			width={size}
			height={size}
		/>
	),
}));

describe("Footer", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should render the footer", () => {
		const { container } = render(<Footer />);
		expect(screen.getByRole("contentinfo")).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it.each([
		["Brand Logo", "/images/loveme-v2.png", "256", "69"],
		["Contact Image", "/images/contact-img.jpg", "180", "115"],
	])("should render %s correctly", (alt, src, width, height) => {
		render(<Footer />);
		const img = screen.getByRole("img", { name: alt });

		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute("src", src);
		expect(img).toHaveAttribute("width", width);
		expect(img).toHaveAttribute("height", height);
		expect(img).toHaveAttribute("loading", "lazy");
		expect(img).toHaveAttribute("alt", alt);
	});

	it("should render social links and have a rendered svg icon inside of it", () => {
		render(<Footer />);

		const socialLinks: HTMLAnchorElement[] =
			screen.getAllByTestId("social-link");
		expect(socialLinks).toHaveLength(3);

		each(socialLinks, (link, index) => {
			expect(link).toHaveAttribute("href", socialLinks[index].href);
			expect(link).toHaveAttribute("aria-label");
			expect(link).toHaveAttribute("target", "_blank");
			expect(link).toHaveAttribute("rel", "noreferrer noopener");
			expect(link).toBeInTheDocument();
			link.click();
		});
	});

	it("should render social icons", () => {
		const { container } = render(<DynamicIcon name="facebook" size={24} />);
		expect(container).toMatchSnapshot();
	});

	it("should render footer navigation links and have correct text content", () => {
		render(<Footer />);
		const navLinksSection = screen.getAllByTestId("nav-link-section");

		each(navLinksSection, (section) => {
			expect(section).toBeInTheDocument();
			expect(section.textContent).not.toBe("");
		});
	});

	it("should render copyright text", () => {
		render(<Footer />);
		const copyrightText = screen.getByText("© Loveme");
		expect(copyrightText).toBeInTheDocument();
	});
});
