import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as L from "leaflet";
import { vi } from "vitest";

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: any) => <div data-testid="map-container">{children}</div>,
  TileLayer: ({ url }: any) => <div data-testid="tile-layer" data-url={url} />,
  Marker: ({ children, eventHandlers }: any) => (
    <div data-testid="map-marker" onClick={() => eventHandlers?.click?.()}>
      {children}
    </div>
  ),
  Popup: ({ children }: any) => <div>{children}</div>,
}));
vi.mock("leaflet", () => ({ Icon: { Default: { mergeOptions: vi.fn() } } }));

import { MapView, type MapMarker } from "./MapView";

const markers: MapMarker[] = [
  {
    id: "hq",
    lat: 59.3293,
    lng: 18.0686,
    title: "Stockholm HQ",
    description: "Main office",
  },
  {
    id: "remote",
    lat: 57.7089,
    lng: 11.9746,
    title: "Gothenburg",
  },
];

describe("MapView", () => {
  it("renders the map and markers", async () => {
    await act(async () => {
      render(<MapView markers={markers} />);
    });

    await waitFor(() => expect(screen.getByTestId("map-container")).toBeInTheDocument());
    expect(screen.getByTestId("tile-layer")).toHaveAttribute(
      "data-url",
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );
    expect(screen.getAllByTestId("map-marker")).toHaveLength(2);
    expect(screen.getByText("Stockholm HQ")).toBeInTheDocument();
    expect(screen.getByText("Main office")).toBeInTheDocument();
  });

  it("calls onMarkerClick when a marker is clicked", async () => {
    const user = userEvent.setup();
    const onMarkerClick = vi.fn();

    await act(async () => {
      render(<MapView markers={markers} onMarkerClick={onMarkerClick} />);
    });

    await waitFor(() => expect(screen.getAllByTestId("map-marker")[0]).toBeInTheDocument());
    await user.click(screen.getAllByTestId("map-marker")[0]);

    expect(onMarkerClick).toHaveBeenCalledWith(markers[0]);
  });

  it("configures the default leaflet marker icons", async () => {
    await act(async () => {
      render(<MapView />);
    });
    await waitFor(() => expect(L.Icon.Default.mergeOptions).toHaveBeenCalled());
    expect(L.Icon.Default.mergeOptions).toHaveBeenCalledWith(
      expect.objectContaining({
        iconRetinaUrl: expect.stringContaining("marker-icon-2x.png"),
        iconUrl: expect.stringContaining("marker-icon.png"),
        shadowUrl: expect.stringContaining("marker-shadow.png"),
      })
    );
  });
});
