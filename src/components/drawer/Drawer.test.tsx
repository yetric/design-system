import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";

function BasicDrawer({ side = "right" as const, showClose = true }) {
  return (
    <Drawer>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent side={side} showClose={showClose}>
        <DrawerHeader>
          <DrawerTitle>Drawer title</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>Drawer content here</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

describe("Drawer", () => {
  it("renders a trigger button", () => {
    render(<BasicDrawer />);
    expect(screen.getByText("Open drawer")).toBeInTheDocument();
  });

  it("drawer content is not visible initially", () => {
    render(<BasicDrawer />);
    expect(screen.queryByText("Drawer content here")).not.toBeInTheDocument();
  });

  it("shows drawer content after trigger click", async () => {
    render(<BasicDrawer />);
    await userEvent.click(screen.getByText("Open drawer"));
    expect(await screen.findByText("Drawer content here")).toBeInTheDocument();
  });

  it("shows close button by default", async () => {
    render(<BasicDrawer />);
    await userEvent.click(screen.getByText("Open drawer"));
    expect(await screen.findByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("hides close button when showClose=false", async () => {
    render(<BasicDrawer showClose={false} />);
    await userEvent.click(screen.getByText("Open drawer"));
    await screen.findByText("Drawer content here");
    expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();
  });

  it("closes when close button is clicked", async () => {
    render(<BasicDrawer />);
    await userEvent.click(screen.getByText("Open drawer"));
    await screen.findByText("Drawer content here");
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText("Drawer content here")).not.toBeInTheDocument();
  });
});
