import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FileUpload } from "./FileUpload";

describe("FileUpload", () => {
  const createObjectURL = vi.fn((file: File) => `blob:${file.name}`);
  const revokeObjectURL = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("URL", {
      ...URL,
      createObjectURL,
      revokeObjectURL,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    createObjectURL.mockClear();
    revokeObjectURL.mockClear();
  });

  it("renders dropzone", () => {
    render(<FileUpload />);

    expect(
      screen.getByRole("button", { name: /drop files here or click to upload/i })
    ).toBeInTheDocument();
  });

  it("shows file list after files are added", () => {
    render(<FileUpload multiple={true} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const imageFile = new File(["image"], "photo.png", { type: "image/png" });
    const documentFile = new File(["document"], "brief.pdf", { type: "application/pdf" });

    fireEvent.change(input, { target: { files: [imageFile, documentFile] } });

    expect(screen.getByText("photo.png")).toBeInTheDocument();
    expect(screen.getByText("brief.pdf")).toBeInTheDocument();
    expect(screen.getByAltText("photo.png")).toHaveAttribute("src", "blob:photo.png");
  });

  it("removes a file from the list", () => {
    render(<FileUpload />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["document"], "brief.pdf", { type: "application/pdf" });

    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByRole("button", { name: /remove brief.pdf/i }));

    expect(screen.queryByText("brief.pdf")).not.toBeInTheDocument();
    expect(revokeObjectURL).not.toHaveBeenCalled();
  });

  it("respects the disabled prop", () => {
    render(<FileUpload disabled />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["document"], "brief.pdf", { type: "application/pdf" });

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
    expect(screen.queryByText("brief.pdf")).not.toBeInTheDocument();
  });

  it("validates maxSize and shows an error", () => {
    render(<FileUpload maxSize={1024} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const oversizedFile = new File([new Uint8Array(2048)], "large.png", { type: "image/png" });

    fireEvent.change(input, { target: { files: [oversizedFile] } });

    expect(screen.getByRole("alert")).toHaveTextContent(/file exceeding the size limit/i);
    expect(screen.queryByText("large.png")).not.toBeInTheDocument();
  });
});
