import { render, screen } from "@testing-library/react";
import { Indicator } from "./Indicator";

describe("Indicator", () => {
  it("renders children without indicator when no count or dot", () => {
    render(
      <Indicator>
        <span>Icon</span>
      </Indicator>
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  it("renders indicator dot when dot=true", () => {
    const { container } = render(
      <Indicator dot>
        <span>Icon</span>
      </Indicator>
    );
    expect(container.querySelectorAll("span").length).toBeGreaterThan(1);
  });

  it("renders count", () => {
    render(
      <Indicator count={5}>
        <span>Icon</span>
      </Indicator>
    );
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders overflow count as 99+", () => {
    render(
      <Indicator count={150} overflowCount={99}>
        <span>Icon</span>
      </Indicator>
    );
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("does not render indicator when count=0 and showZero=false", () => {
    const { container } = render(
      <Indicator count={0}>
        <span>Icon</span>
      </Indicator>
    );
    // Should only have the children span
    expect(container.querySelectorAll("[role='status']").length).toBe(0);
  });

  it("renders when count=0 and showZero=true", () => {
    render(
      <Indicator count={0} showZero>
        <span>Icon</span>
      </Indicator>
    );
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
