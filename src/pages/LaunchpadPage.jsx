import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default marker icons (GitHub Pages compatible)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

export default function LaunchpadPage() {
  const { id } = useParams();
  const [pad, setPad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPad() {
      try {
        const res = await fetch(`https://api.spacexdata.com/v4/launchpads/${id}`);
        const data = await res.json();
        setPad(data);
      } catch (e) {
        console.error("Launchpad fetch failed", e);
      } finally {
        setLoading(false);
      }
    }

    fetchPad();
  }, [id]);

  if (loading) return <main><p>Loading launchpad…</p></main>;
  if (!pad) return <main><p>Launchpad not found.</p></main>;

  return (
    <main>
      <h1>{pad.name}</h1>

      <p>
        <Link to="https://robbiesherre67.github.io/spacex-dashboard/" style={{ color: "var(--primary)" }}>
          ← Back to Launches
        </Link>
      </p>

      <div style={{ height: "450px", marginTop: "1rem", borderRadius: "8px" }}>
        <MapContainer
          center={[pad.latitude, pad.longitude]}
          zoom={10}
          style={{ height: "100%", width: "100%", borderRadius: "8px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[pad.latitude, pad.longitude]}>
            <Popup>
              {pad.full_name}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <p style={{ marginTop: "1rem" }}>
        <strong>Locality:</strong> {pad.locality}<br />
        <strong>Region:</strong> {pad.region}<br />
        <strong>Status:</strong> {pad.status}
      </p>
    </main>
  );
}
