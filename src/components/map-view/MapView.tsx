"use client";

import * as React from "react";
import * as L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { cn } from "../../lib/cn";

const DEFAULT_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const DEFAULT_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const DEFAULT_MARKER_ICON = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const DEFAULT_MARKER_ICON_RETINA = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const DEFAULT_MARKER_SHADOW = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: DEFAULT_MARKER_ICON_RETINA,
  iconUrl: DEFAULT_MARKER_ICON,
  shadowUrl: DEFAULT_MARKER_SHADOW,
});

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title?: string;
  description?: string;
  icon?: string;
}

export interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  height?: number | string;
  className?: string;
  onMarkerClick?: (marker: MapMarker) => void;
  tileUrl?: string;
  attribution?: string;
}

function getMarkerIcon(iconUrl?: string) {
  if (!iconUrl || !("icon" in L) || typeof L.icon !== "function") {
    return undefined;
  }

  return L.icon({
    iconUrl,
    iconRetinaUrl: iconUrl,
    shadowUrl: DEFAULT_MARKER_SHADOW,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

export function MapView({
  center = [0, 0],
  zoom = 13,
  markers = [],
  height = 400,
  className,
  onMarkerClick,
  tileUrl = DEFAULT_TILE_URL,
  attribution = DEFAULT_ATTRIBUTION,
}: MapViewProps) {
  const markerIcons = React.useMemo(
    () =>
      markers.reduce<Record<string, ReturnType<typeof getMarkerIcon>>>((accumulator, marker) => {
        accumulator[marker.id] = getMarkerIcon(marker.icon);
        return accumulator;
      }, {}),
    [markers]
  );

  return (
    <div className={cn("overflow-hidden rounded-lg border border-border", className)} style={{ height }}>
      <MapContainer center={center} zoom={zoom} className="h-full w-full">
        <TileLayer attribution={attribution} url={tileUrl} />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={markerIcons[marker.id]}
            eventHandlers={
              onMarkerClick
                ? {
                    click: () => onMarkerClick(marker),
                  }
                : undefined
            }
          >
            {(marker.title || marker.description) && (
              <Popup>
                <div className="space-y-1">
                  {marker.title ? <p className="font-medium text-foreground">{marker.title}</p> : null}
                  {marker.description ? (
                    <p className="text-sm text-muted-foreground">{marker.description}</p>
                  ) : null}
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
