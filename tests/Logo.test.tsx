import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Logo from "@/components/client/logo/Logo";

describe("Logo component", () => {
	it("renders correctly", ({ expect }) => {
		const { container } = render(<Logo src="logo.png" alt="Logo" />);
		expect(container).toMatchSnapshot();
	});
	it("renders with default width and height", () => {
		const { getByRole } = render(<Logo src="logo.png" alt="Logo" />);
		const image = getByRole("img");
		expect(image).toHaveAttribute("width", "100");
		expect(image).toHaveAttribute("height", "100");
	});
	it("renders with custom width and height", () => {
		const { getByRole } = render(
			<Logo src="logo.png" alt="Logo" width={200} height={300} />,
		);
		const image = getByRole("img");
		expect(image).toHaveAttribute("width", "200");
		expect(image).toHaveAttribute("height", "300");
	});
	it("renders with alt text", () => {
		const { getByRole } = render(<Logo src="logo.png" alt="Logo" />);
		const image = getByRole("img");
		expect(image).toHaveAttribute("alt", "Logo");
	});
	it("renders with src attribute", () => {
		const { getByRole } = render(<Logo src="logo.png" alt="Logo" />);
		const image = getByRole("img");
		expect(image).toHaveAttribute("src", "logo.png");
	});
});
