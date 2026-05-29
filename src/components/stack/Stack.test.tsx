import { render } from "@testing-library/react";

import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders children", () => {
    const { getByText } = render(
      <Stack>
        <span>A</span>
        <span>B</span>
      </Stack>
    );
    expect(getByText("A")).toBeInTheDocument();
    expect(getByText("B")).toBeInTheDocument();
  });

  it("defaults to flex-col", () => {
    const { container } = render(
      <Stack>
        <span>x</span>
      </Stack>
    );
    expect(container.firstChild).toHaveClass("flex", "flex-col", "gap-4");
  });

  it("applies row direction", () => {
    const { container } = render(
      <Stack direction="row">
        <span>x</span>
      </Stack>
    );
    expect(container.firstChild).toHaveClass("flex-row");
  });

  it("applies custom gap", () => {
    const { container } = render(
      <Stack gap={8}>
        <span>x</span>
      </Stack>
    );
    expect(container.firstChild).toHaveClass("gap-8");
  });

  it("applies align and justify", () => {
    const { container } = render(
      <Stack align="center" justify="between">
        <span>x</span>
      </Stack>
    );
    expect(container.firstChild).toHaveClass("items-center", "justify-between");
  });

  it("renders as a different element", () => {
    const { container } = render(
      <Stack as="section">
        <span>x</span>
      </Stack>
    );
    expect(container.firstChild?.nodeName).toBe("SECTION");
  });

  it("accepts custom className", () => {
    const { container } = render(
      <Stack className="p-4">
        <span>x</span>
      </Stack>
    );
    expect(container.firstChild).toHaveClass("p-4");
  });
});
