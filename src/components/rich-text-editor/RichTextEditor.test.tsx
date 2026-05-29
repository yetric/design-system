import { render, screen, waitFor } from "@testing-library/react";

import { RichTextEditor } from "./RichTextEditor";

describe("RichTextEditor", () => {
  it("renders initial HTML content", () => {
    render(<RichTextEditor value="<p>Hello world</p>" />);

    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("syncs external value changes", async () => {
    const { rerender } = render(<RichTextEditor value="<p>Old value</p>" />);

    rerender(<RichTextEditor value="<p>Updated value</p>" />);

    await waitFor(() => {
      expect(screen.getByText("Updated value")).toBeInTheDocument();
    });
  });

  it("renders toolbar controls by default", () => {
    render(<RichTextEditor />);

    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Link" })).toBeInTheDocument();
  });

  it("supports disabled and toolbarless modes", async () => {
    const { container, rerender } = render(<RichTextEditor disabled />);

    await waitFor(() => {
      expect(container.querySelector(".ProseMirror")).toHaveAttribute("contenteditable", "false");
    });
    expect(screen.getByRole("button", { name: "Bold" })).toBeDisabled();

    rerender(<RichTextEditor toolbar={false} />);

    expect(screen.queryByRole("button", { name: "Bold" })).not.toBeInTheDocument();
  });
});
