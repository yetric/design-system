import { render, screen, fireEvent } from "@testing-library/react";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders with fallback initials when no src", () => {
    render(<Avatar fallback="AB" />);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("derives initials from alt when no fallback", () => {
    render(<Avatar alt="Alice Bob" />);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders image when src is provided", () => {
    render(<Avatar src="https://example.com/avatar.png" alt="User" />);
    expect(document.querySelector("img")).toBeInTheDocument();
    expect(document.querySelector("img")).toHaveAttribute("src", "https://example.com/avatar.png");
  });

  it("falls back to initials when image errors", () => {
    render(<Avatar src="broken.png" alt="John Doe" />);
    const img = document.querySelector("img")!;
    fireEvent.error(img);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("applies size classes", () => {
    render(<Avatar fallback="XS" size="xs" />);
    const avatar = screen.getByRole("img");
    expect(avatar).toHaveClass("h-6", "w-6");
  });

  it("defaults to md size", () => {
    render(<Avatar fallback="MD" />);
    expect(screen.getByRole("img")).toHaveClass("h-10", "w-10");
  });

  it("shows ? when no fallback or alt", () => {
    render(<Avatar />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Avatar fallback="AB" className="border-2" />);
    expect(screen.getByRole("img")).toHaveClass("border-2");
  });

  it("applies radius prop", () => {
    render(<Avatar fallback="AB" radius="sm" />);
    expect(screen.getByRole("img")).toHaveClass("rounded");
  });

  it("renders status indicator when status is provided", () => {
    render(<Avatar fallback="AB" status="online" />);
    const dot = screen.getByLabelText("online");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveClass("bg-success");
  });

  it("renders correct status color for busy", () => {
    render(<Avatar fallback="AB" status="busy" />);
    expect(screen.getByLabelText("busy")).toHaveClass("bg-destructive");
  });
});
