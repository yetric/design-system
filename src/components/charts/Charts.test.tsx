import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AreaChart, BarChart, LineChart, PieChart } from "./Charts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 320 },
  { name: "Mar", value: 510 },
];

describe("Charts", () => {
  it("LineChart renders without crashing", () => {
    render(<LineChart data={data} dataKey="value" />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("BarChart renders without crashing", () => {
    render(<BarChart data={data} dataKey="value" />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("AreaChart renders without crashing", () => {
    render(<AreaChart data={data} dataKey="value" />);
    expect(screen.getByTestId("area-chart")).toBeInTheDocument();
  });

  it("PieChart renders without crashing", () => {
    render(<PieChart data={data} />);
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
  });
});
