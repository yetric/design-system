import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Timeline, TimelineItem } from "./Timeline";

describe("Timeline", () => {
  it("renders a list", () => {
    render(
      <Timeline>
        <TimelineItem title="Step 1" last />
      </Timeline>
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("renders item title", () => {
    render(
      <Timeline>
        <TimelineItem title="Deployed" last />
      </Timeline>
    );
    expect(screen.getByText("Deployed")).toBeInTheDocument();
  });

  it("renders item description", () => {
    render(
      <Timeline>
        <TimelineItem title="Event" description="Something happened" last />
      </Timeline>
    );
    expect(screen.getByText("Something happened")).toBeInTheDocument();
  });

  it("renders item time", () => {
    render(
      <Timeline>
        <TimelineItem title="Deploy" time="2 hours ago" last />
      </Timeline>
    );
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
  });

  it("renders multiple items", () => {
    render(
      <Timeline>
        <TimelineItem title="First" />
        <TimelineItem title="Second" last />
      </Timeline>
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
