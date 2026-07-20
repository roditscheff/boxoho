"use client";

import { useEffect, useRef, useState } from "react";
import { fill } from "@/i18n/dictionary";
import type { Dictionary } from "@/i18n/dictionary";
import type { PublicMapPoint } from "@/lib/types";
import "maplibre-gl/dist/maplibre-gl.css";

type Filter = "all" | "postcards" | "artworks";

type CollectorsMapProps = {
  map: Dictionary["map"];
};

export function CollectorsMap({ map }: CollectorsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("maplibre-gl").Map | null>(null);
  const popupCtorRef = useRef<typeof import("maplibre-gl").Popup | null>(null);
  const popupRef = useRef<import("maplibre-gl").Popup | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [points, setPoints] = useState<PublicMapPoint[]>([]);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/map?filter=${filter}`);
      const data = (await res.json()) as {
        configured?: boolean;
        points?: PublicMapPoint[];
      };
      if (cancelled) return;
      setConfigured(Boolean(data.configured));
      setPoints(data.points ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [filter]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let destroyed = false;

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      popupCtorRef.current = maplibregl.Popup;
      if (destroyed || !containerRef.current) return;

      const instance = new maplibregl.Map({
        container: containerRef.current,
        style: {
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "© OpenStreetMap",
            },
          },
          layers: [{ id: "osm", type: "raster", source: "osm" }],
        },
        center: [7.9, 46.55],
        zoom: 2.2,
      });

      instance.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
      mapRef.current = instance;
      instance.on("load", () => setReady(true));
    })();

    return () => {
      destroyed = true;
      popupRef.current?.remove();
      popupRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
      setReady(false);
    };
  }, []);

  useEffect(() => {
    const instance = mapRef.current;
    if (!instance || !ready) return;

    const sourceId = "collectors";
    const artworkLayer = "collectors-artworks";
    const postcardLayer = "collectors-postcards";

    const geojson: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: points.map((p) => ({
        type: "Feature",
        properties: {
          id: p.id,
          type: p.type,
          firstName: p.firstName,
          imageUrl: p.imageUrl,
        },
        geometry: {
          type: "Point",
          coordinates: [p.lng, p.lat],
        },
      })),
    };

    if (instance.getSource(sourceId)) {
      (instance.getSource(sourceId) as import("maplibre-gl").GeoJSONSource).setData(geojson);
    } else {
      instance.addSource(sourceId, { type: "geojson", data: geojson });
      instance.addLayer({
        id: artworkLayer,
        type: "circle",
        source: sourceId,
        filter: ["==", ["get", "type"], "artwork"],
        paint: {
          "circle-radius": 8,
          "circle-color": "#9c4f3a",
          "circle-opacity": 0.85,
          "circle-stroke-width": 10,
          "circle-stroke-color": "rgba(156, 79, 58, 0.18)",
        },
      });
      instance.addLayer({
        id: postcardLayer,
        type: "circle",
        source: sourceId,
        filter: ["==", ["get", "type"], "postcard"],
        paint: {
          "circle-radius": 7,
          "circle-color": "#1c1917",
          "circle-opacity": 0.75,
          "circle-stroke-width": 10,
          "circle-stroke-color": "rgba(28, 25, 23, 0.12)",
        },
      });

      const clickableLayers = [artworkLayer, postcardLayer];
      for (const layerId of clickableLayers) {
        instance.on("mouseenter", layerId, () => {
          instance.getCanvas().style.cursor = "pointer";
        });
        instance.on("mouseleave", layerId, () => {
          instance.getCanvas().style.cursor = "";
        });
        instance.on("click", layerId, (e) => {
          const feature = e.features?.[0];
          if (!feature || feature.geometry.type !== "Point") return;
          const props = feature.properties as {
            firstName?: string;
            imageUrl?: string | null;
          } | null;
          const [lng, lat] = feature.geometry.coordinates as [number, number];
          const name = props?.firstName ?? "";
          const imageUrl = props?.imageUrl ?? null;

          const wrapper = document.createElement("div");
          wrapper.className = "boxoho-map-popup";
          if (imageUrl) {
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = map.popupImageAlt;
            img.className = "boxoho-map-popup__image";
            wrapper.appendChild(img);
          }
          const label = document.createElement("p");
          label.className = "boxoho-map-popup__label";
          label.textContent = name ? fill(map.popupCollector, { name }) : "";
          wrapper.appendChild(label);

          const PopupCtor = popupCtorRef.current;
          if (!PopupCtor) return;
          popupRef.current?.remove();
          popupRef.current = new PopupCtor({ closeButton: true, offset: 14 })
            .setLngLat([lng, lat])
            .setDOMContent(wrapper)
            .addTo(instance);
        });
      }
    }

    if (points.length > 0) {
      const lngs = points.map((p) => p.lng);
      const lats = points.map((p) => p.lat);
      instance.fitBounds(
        [
          [Math.min(...lngs) - 2, Math.min(...lats) - 2],
          [Math.max(...lngs) + 2, Math.max(...lats) + 2],
        ],
        { padding: 48, maxZoom: 5, duration: 800 },
      );
    }
  }, [points, ready, map.popupCollector, map.popupImageAlt]);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: map.filterAll },
    { id: "postcards", label: map.filterPostcards },
    { id: "artworks", label: map.filterArtworks },
  ];

  return (
    <div>
      <div
        className="flex flex-wrap gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em]"
        role="tablist"
        aria-label={map.filterLabel}
      >
        {filters.map((item) => {
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(item.id)}
              className={
                active
                  ? "border border-ink bg-ink px-4 py-2 text-paper"
                  : "border border-rule px-4 py-2 text-ink-soft transition-colors hover:border-stamp hover:text-stamp"
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="relative mt-6 overflow-hidden border border-rule bg-paper-deep">
        <div ref={containerRef} className="aspect-[16/10] w-full" />
        {configured === false ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-paper/95 to-transparent px-6 pb-5 pt-16">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-stamp">
              {map.teaserLabel}
            </p>
            <p className="mt-2 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
              {map.teaserBody}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-stamp/80" aria-hidden />
            {map.legendArtwork}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/70" aria-hidden />
            {map.legendPostcard}
          </span>
        </div>
        {configured ? (
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
            {points.length} · ~100 km
          </p>
        ) : null}
      </div>
    </div>
  );
}
