// Purpose:
// - Display all SpaceX rockets in a clean responsive grid
// - Filters include: active status, height range, boosters count
// - Demonstrates senior-level UI patterns and data transformation

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RocketFleetPage() {
  const [rockets, setRockets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [activeOnly, setActiveOnly] = useState(false);
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(140); // Falcon Heavy ~70m, Starship ~120m
  const [boosters, setBoosters] = useState("");

  useEffect(() => {
    async function getRockets() {
      try {
        const res = await fetch("https://api.spacexdata.com/v4/rockets");
        const data = await res.json();
        setRockets(data);
      } catch (e) {
        console.error("Failed to load rockets", e);
      } finally {
        setLoading(false);
      }
    }
    getRockets();
  }, []);

  if (loading) return <main><p>Loading rockets...</p></main>;

  // ---------------------------
  // FILTER PIPELINE
  // ---------------------------
  let filtered = [...rockets];

  if (activeOnly) {
    filtered = filtered.filter((r) => r.active === true);
  }

  filtered = filtered.filter((r) => {
    const h = r.height.meters ?? 0;
    return h >= minHeight && h <= maxHeight;
  });

  if (boosters !== "") {
    filtered = filtered.filter((r) => r.boosters === Number(boosters));
  }

  return (
    <main>
      <h1>Rocket Fleet</h1>

      {/* FILTERS */}
      <div
        style={{
          background: "var(--surface)",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          boxShadow: "0 2px 6px var(--card-shadow)"
        }}
      >
        <label style={{ display: "block", marginBottom: "0.6rem" }}>
          <strong>Active Rockets Only:</strong>
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={(e) => setActiveOnly(e.target.checked)}
            style={{ marginLeft: "0.6rem", transform: "scale(1.3)" }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "0.6rem" }}>
          <strong>Min Height (m):</strong>
          <input
            type="number"
            value={minHeight}
            onChange={(e) => setMinHeight(Number(e.target.value))}
            style={{
              padding: "0.4rem",
              marginLeft: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100px"
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "0.6rem" }}>
          <strong>Max Height (m):</strong>
          <input
            type="number"
            value={maxHeight}
            onChange={(e) => setMaxHeight(Number(e.target.value))}
            style={{
              padding: "0.4rem",
              marginLeft: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100px"
            }}
          />
        </label>

        <label style={{ display: "block" }}>
          <strong>Booster Count:</strong>
          <select
            value={boosters}
            onChange={(e) => setBoosters(e.target.value)}
            style={{
              marginLeft: "0.6rem",
              padding: "0.4rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100px"
            }}
          >
            <option value="">All</option>
            <option value="0">0 boosters</option>
            <option value="1">1 booster</option>
            <option value="2">2 boosters</option>
            <option value="3">3 boosters</option>
          </select>
        </label>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gap: "1.2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
        }}
      >
        {filtered.map((rocket) => (
          <div
            key={rocket.id}
            style={{
              background: "var(--surface)",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 2px 6px var(--card-shadow)",
              transition: "background 0.25s ease"
            }}
          >
            {rocket.flickr_images[0] && (
              <img
                src={rocket.flickr_images[0]}
                alt={rocket.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "0.8rem"
                }}
              />
            )}

            <h2 style={{ marginBottom: "0.4rem" }}>{rocket.name}</h2>
            <p style={{ marginBottom: "0.4rem" }}>
              <strong>Height:</strong> {rocket.height.meters} m
            </p>

            <p style={{ marginBottom: "0.4rem" }}>
              <strong>Boosters:</strong> {rocket.boosters}
            </p>

            <Link
              to={`/rocket/${rocket.id}`}
              style={{ color: "var(--primary)" }}
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
