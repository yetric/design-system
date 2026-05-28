import { render } from "@testing-library/react";
import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("renders children", () => {
    const { getByText } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    );
    expect(getByText("Content")).toBeInTheDocument();
  });
});
