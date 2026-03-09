"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const PLACES = [
  {
    name: "Quillón",
    lat: -36.726,
    lng: -72.482,
    emoji: "🏡",
    color: "#d17aaa",
    done: true,
  },
  {
    name: "Concepción",
    lat: -36.827,
    lng: -73.05,
    emoji: "🌆",
    color: "#9b72cf",
    done: true,
  },
  {
    name: "Tomé",
    lat: -36.619,
    lng: -72.958,
    emoji: "🌊",
    color: "#5cb8a0",
    done: true,
  },
  {
    name: "Niebla",
    lat: -39.877,
    lng: -73.39,
    emoji: "🌫️",
    color: "#7abda0",
    done: true,
  },
  {
    name: "Valdivia",
    lat: -39.814,
    lng: -73.245,
    emoji: "🦭",
    color: "#d17aaa",
    done: true,
  },
  {
    name: "Santiago",
    lat: -33.448,
    lng: -70.669,
    emoji: "✨",
    date: "Mayo 2026",
    color: "#c4b0e0",
    done: false,
  },
];

function makeIcon(emoji: string, color: string, done: boolean) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        display:flex;flex-direction:column;align-items:center;
        filter:${done ? "none" : "grayscale(.4) opacity(.75)"};
      ">
        <div style="
          width:38px;height:38px;border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          background:${color};
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 4px 14px rgba(0,0,0,.22);
          border:2.5px solid white;
        ">
          <span style="transform:rotate(45deg);font-size:17px;line-height:1">${emoji}</span>
        </div>
        <div style="width:8px;height:8px;background:${color};border-radius:50%;margin-top:-2px;opacity:.6"></div>
      </div>
    `,
    iconSize: [38, 50],
    iconAnchor: [19, 50],
    popupAnchor: [0, -52],
  });
}

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(PLACES.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [60, 60] });
  }, [map]);
  return null;
}

export default function MapView() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(58,37,64,.15)",
      }}
    >
      <style suppressHydrationWarning>{`
        .leaflet-container { background: #f0f7f4; }
        .leaflet-popup-content-wrapper {
          border-radius: 16px !important;
          box-shadow: 0 8px 30px rgba(58,37,64,.18) !important;
          border: 1.5px solid rgba(155,114,207,.2) !important;
          padding: 0 !important;
          overflow: hidden;
        }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-popup-tip { background: white !important; }
        .leaflet-control-zoom a {
          border-radius: 8px !important;
          color: #9b72cf !important;
        }
      `}</style>
      <MapContainer
        center={[-36.5, -71.5]}
        zoom={6}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
          className="map-tiles"
        />
        <FitBounds />
        {PLACES.map((p) => (
          <Marker
            key={p.name}
            position={[p.lat, p.lng]}
            icon={makeIcon(p.emoji, p.color, p.done)}
          >
            <Popup>
              <div
                style={{
                  padding: "1rem 1.2rem",
                  minWidth: "160px",
                  fontFamily: "inherit",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                    marginBottom: ".3rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{p.emoji}</span>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      color: "#3a2540",
                    }}
                  >
                    {p.name}
                  </span>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    padding: ".2rem .75rem",
                    borderRadius: "99px",
                    background: p.done
                      ? "linear-gradient(135deg,#d4f5e9,#b5ead7)"
                      : "linear-gradient(135deg,#ede7f6,#d1c4e9)",
                    color: p.done ? "#2e7d5a" : "#7e57c2",
                    fontSize: ".78rem",
                    fontWeight: 600,
                  }}
                >
                  {p.done ? `✓ Visitado` : `🔜 ${p.date}`}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
