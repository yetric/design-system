import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { VideoPlayer } from "./VideoPlayer";

describe("VideoPlayer", () => {
  it("renders a labeled video with controls by default", () => {
    render(<VideoPlayer src="/demo.mp4" title="Product demo" poster="/poster.jpg" />);

    const video = screen.getByLabelText("Product demo");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("poster", "/poster.jpg");
    expect(video.parentElement).toHaveStyle({ aspectRatio: "16 / 9" });
  });

  it("renders multiple source elements when given an array", () => {
    render(
      <VideoPlayer
        title="Multi source demo"
        aspectRatio="4/3"
        src={[
          { src: "/demo.webm", type: "video/webm" },
          { src: "/demo.mp4", type: "video/mp4" },
        ]}
      />
    );

    const video = screen.getByLabelText("Multi source demo");
    expect(video.querySelectorAll("source")).toHaveLength(2);
    expect(video.parentElement).toHaveStyle({ aspectRatio: "4 / 3" });
  });

  it("forwards media event callbacks", () => {
    const onPlay = vi.fn();
    const onPause = vi.fn();
    const onEnded = vi.fn();

    render(
      <VideoPlayer
        src="/demo.mp4"
        title="Event demo"
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
      />
    );

    const video = screen.getByLabelText("Event demo");
    fireEvent(video, new Event("play"));
    fireEvent(video, new Event("pause"));
    fireEvent(video, new Event("ended"));

    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onPause).toHaveBeenCalledTimes(1);
    expect(onEnded).toHaveBeenCalledTimes(1);
  });

  it("applies a custom className to the container", () => {
    render(<VideoPlayer src="/demo.mp4" title="Custom class demo" className="custom-player" />);

    expect(screen.getByLabelText("Custom class demo").parentElement).toHaveClass("custom-player");
  });
});
