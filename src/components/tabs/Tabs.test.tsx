import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

function BasicTabs() {
  return (
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">Tab A</TabsTrigger>
        <TabsTrigger value="b">Tab B</TabsTrigger>
        <TabsTrigger value="c" disabled>Tab C</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Content A</TabsContent>
      <TabsContent value="b">Content B</TabsContent>
      <TabsContent value="c">Content C</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders tabs and shows default content", () => {
    render(<BasicTabs />);
    expect(screen.getByText("Content A")).toBeInTheDocument();
    expect(screen.queryByText("Content B")).not.toBeInTheDocument();
  });

  it("switches content when a tab is clicked", async () => {
    render(<BasicTabs />);
    await userEvent.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(screen.getByText("Content B")).toBeInTheDocument();
    expect(screen.queryByText("Content A")).not.toBeInTheDocument();
  });

  it("disabled tab cannot be activated", async () => {
    render(<BasicTabs />);
    const disabled = screen.getByRole("tab", { name: "Tab C" });
    expect(disabled).toHaveAttribute("data-disabled");
    await userEvent.click(disabled);
    expect(screen.queryByText("Content C")).not.toBeInTheDocument();
  });

  it("active tab has data-state=active", () => {
    render(<BasicTabs />);
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute("data-state", "active");
    expect(screen.getByRole("tab", { name: "Tab B" })).toHaveAttribute("data-state", "inactive");
  });
});
