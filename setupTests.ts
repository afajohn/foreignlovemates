import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/user-event";
import type { ImageProps } from "next/image";
import { createElement } from "react";

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
	cleanup();
	vi.clearAllMocks();
});

// this is a global mock for next/image
vi.mock("next/image", () => ({
	__esModule: true,
	default: (props: ImageProps) => {
		const { src, alt, loading, priority, ...rest } = props;
		// Mock an img tag with relevant props
		return createElement("img", {
			src,
			alt,
			loading: priority ? undefined : loading || "lazy",
			...rest,
		});
	},
}));
