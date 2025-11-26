import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RocketDetailPage() {
  const { id } = useParams();
  const [rocket, setRocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRocket() {
      try {
        const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
        const data = await res.json();
        setRocket(data);
      } catch (e) {
        console.error("Rocket fetch failed", e);
      } finally {
        setLoading(false);
      }
    }

    fetchRocket();
  }, [id]);

  if (loading) return <main><p>Loading rocket...</p></main>;
  if (!rocket) return <main><p>Rocket not found.</p></main>;

  return (
    <main>
      <h1>{rocket.name}</h1>

      <p>
        <Link to="/" style={{ color: "var(--primary)" }}>
          ← Back to Launches
        </Link>
      </p>

      <div
        style={{
          marginTop: "1rem",
          padding: "1.5rem",
          background: "var(--surface)",
          borderRadius: "8px",
          boxShadow: "0 2px 6px var(--card-shadow)"
        }}
      >
        {/* Rocket Images */}
        {rocket.flickr_images?.length > 0 && (
          <img
            src={rocket.flickr_images[0]}
            alt={`${rocket.name} image`}
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "10px",
              marginBottom: "1.3rem"
            }}
          />
        )}

        <p><strong>Height:</strong> {rocket.height.meters} m</p>
        <p><strong>Diameter:</strong> {rocket.diameter.meters} m</p>
        <p><strong>Mass:</strong> {rocket.mass.kg.toLocaleString()} kg</p>

        <p style={{ marginTop: "1rem", lineHeight: "1.6" }}>
          <strong>Description:</strong><br />
          {rocket.description}
        </p>
      </div>
    </main>
  );
}
