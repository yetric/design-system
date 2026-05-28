import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Bold, Italic } from "lucide-react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "./Toolbar";

describe("Toolbar", () => {
  it("renders toolbar", () => {
    render(
      <Toolbar aria-label="Text formatting">
        <ToolbarButton aria-label="Bold">
          <Bold className="h-4 w-4" />
        </ToolbarButton>
      </Toolbar>
    );
    expect(screen.getByRole("toolbar")).toBeInTheDocument();
  });

  it("renders buttons", () => {
    render(
      <Toolbar aria-label="Formatting">
        <ToolbarButton aria-label="Bold"><Bold className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton aria-label="Italic"><Italic className="h-4 w-4" /></ToolbarButton>
      </Toolbar>
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("renders separator", () => {
    render(
      <Toolbar aria-label="Tools">
        <ToolbarButton aria-label="Bold"><Bold className="h-4 w-4" /></ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Italic"><Italic className="h-4 w-4" /></ToolbarButton>
      </Toolbar>
    );
    expect(document.querySelector('[role="separator"]')).toBeInTheDocument();
  });

  it("renders toggle group", () => {
    render(
      <Toolbar aria-label="Align">
        <ToolbarToggleGroup type="single" aria-label="Text alignment">
          <ToolbarToggleItem value="left" aria-label="Left">L</ToolbarToggleItem>
          <ToolbarToggleItem value="right" aria-label="Right">R</ToolbarToggleItem>
        </ToolbarToggleGroup>
      </Toolbar>
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });
});
