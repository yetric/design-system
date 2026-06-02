"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

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

// Loaded lazily so Leaflet (which accesses window at import time) is never
// evaluated on the server. The shell renders a same-size placeholder until
// the client-side bundle is ready.
const LazyMapViewInner = React.lazy(() =>
  import("./MapViewInner").then((m) => ({ default: m.MapViewInner }))
);

// useSyncExternalStore is the React-recommended way to detect client vs server
// without a setState-in-effect or hydration mismatch.
const noopSubscribe = () => () => {};
function useIsClient() {
  return React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export function MapView({ height = 400, className, ...props }: MapViewProps) {
  const isClient = useIsClient();

  const placeholder = (
    <div
      className={cn("border-border bg-muted overflow-hidden rounded-lg border", className)}
      style={{ height }}
      aria-hidden="true"
    />
  );

  if (!isClient) return placeholder;

  return (
    <React.Suspense fallback={placeholder}>
      <LazyMapViewInner height={height} className={className} {...props} />
    </React.Suspense>
  );
}
