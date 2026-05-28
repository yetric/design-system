import { render, screen } from "@testing-library/react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";

describe("HoverCard", () => {
  it("renders the trigger and content structure", () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>View profile</HoverCardTrigger>
        <HoverCardContent>
          <p>@yetric</p>
          <p>Design systems for product teams.</p>
        </HoverCardContent>
      </HoverCard>
    );

    expect(screen.getByText("View profile")).toBeInTheDocument();
    expect(screen.getByText("@yetric")).toBeInTheDocument();
    expect(screen.getByText("Design systems for product teams.")).toBeInTheDocument();
  });
});
