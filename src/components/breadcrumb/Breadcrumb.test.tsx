import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders with aria-label breadcrumb", () => {
    render(<Breadcrumb><BreadcrumbList /></Breadcrumb>);
    expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeInTheDocument();
  });

  it("renders all items", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Components</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();
  });

  it("current page has aria-current=page", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(screen.getByText("Current")).toHaveAttribute("aria-current", "page");
  });

  it("renders ellipsis", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(screen.getByText("More")).toBeInTheDocument();
  });
});
