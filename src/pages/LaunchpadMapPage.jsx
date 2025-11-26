// Purpose:
// Display all SpaceX launchpads on an interactive Leaflet map.
// Each launchpad has a popup with:
// - Name
// - Status (active/retired)
// - Region / locality
// - Number of launches
// Demonstrates real-world mapping, async loading, and responsive UI.

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet icon bug on Vite
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function LaunchpadMapPage() {
  const [pads, setPads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPads() {
      try {
        const res = await fetch("https://api.spacexdata.com/v4/launchpads");
        const data = await res.json();
        setPads(data);
      } catch (e) {
        console.error("Failed to load launchpads:", e);
      } finally {
        setLoading(false);
      }
    }
    loadPads();
  }, []);

  if (loading) return <main><p>Loading launchpad map...</p></main>;

  return (
    <main>
      <h1>Launchpads</h1>

      <div
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 6px var(--card-shadow)"
        }}
      >
        <MapContainer
          center={[20, 0]} // global center
          zoom={2}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Light / dark tile layer based on theme */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {pads.map((pad) => (
            <Marker
              key={pad.id}
              position={[pad.latitude, pad.longitude]}
            >
              <Popup>
                <strong>{pad.name}</strong>
                <br />
                {pad.locality}, {pad.region}
                <br />
                Status:{" "}
                <span style={{ fontWeight: 700, color: pad.status === "active" ? "#00a859" : "#b30000" }}>
                  {pad.status.toUpperCase()}
                </span>
                <br />
                Launch Attempts: {pad.launch_attempts}
                <br />
                Launch Successes: {pad.launch_successes}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </main>
  );
}