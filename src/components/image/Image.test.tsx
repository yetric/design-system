import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Image } from "./Image";

describe("Image", () => {
  it("renders img element with correct src and alt", () => {
    render(<Image src="https://example.com/image.png" alt="Example image" />);

    expect(screen.getByRole("img", { name: "Example image" })).toHaveAttribute(
      "src",
      "https://example.com/image.png"
    );
  });

  it("applies lazy loading by default", () => {
    render(<Image src="https://example.com/image.png" alt="Example image" />);

    expect(screen.getByRole("img", { name: "Example image" })).toHaveAttribute("loading", "lazy");
  });

  it("shows fallback on error", () => {
    render(<Image src="broken.png" alt="John Doe" fallback="JD" />);

    fireEvent.error(screen.getByRole("img", { name: "John Doe" }));

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("applies radius class", () => {
    const { container } = render(
      <Image src="https://example.com/image.png" alt="Rounded image" radius="xl" />
    );

    expect(container.querySelector("figure")).toHaveClass("rounded-xl");
  });

  it("applies aspect ratio styles", () => {
    const { container } = render(
      <Image src="https://example.com/image.png" alt="Square image" aspectRatio="square" />
    );

    expect(container.querySelector("figure")).toHaveClass("aspect-square");
  });
});
