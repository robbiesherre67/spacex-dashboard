// Purpose:
// - Display all SpaceX rockets
// - Demonstrates handling multiple API endpoints
// - Shows reusable layout and ADA-friendly components
// - Each rocket links to the Rocket Detail Page

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRockets } from "../api/spacexApi";

export default function RocketsPage() {
  const [rockets, setRockets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await fetchRockets();
      setRockets(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <main><p>Loading rockets...</p></main>;

  return (
    <main>
      <h1>SpaceX Rockets</h1>

      <div
        style={{
          display: "grid",
          gap: "1.2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
        }}
      >
        {rockets.map((r) => (
          <div
            key={r.id}
            className="launch-card"
            style={{
              padding: "1rem",
              borderRadius: "8px",
              transition: "background 0.25s ease"
            }}
          >
            <h2 style={{ marginBottom: "0.4rem" }}>{r.name}</h2>

            <p><strong>Country:</strong> {r.country}</p>
            <p><strong>Stages:</strong> {r.stages}</p>
            <p><strong>Boosters:</strong> {r.boosters}</p>
            <p><strong>Cost per Launch:</strong> ${r.cost_per_launch.toLocaleString()}</p>

            <Link
              to={`/rocket/${r.id}`}
              style={{
                marginTop: "0.6rem",
                display: "inline-block",
                color: "var(--primary)",
                fontWeight: 600
              }}
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}