// Purpose:
// - Display all SpaceX rockets
// - Demonstrates handling multiple API endpoints
// - Shows reusable layout and ADA-friendly components

import { useEffect, useState } from "react";
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

  if (loading) return <p>Loading rockets...</p>;

  return (
    <main>
      <h1>SpaceX Rockets</h1>

      {rockets.map((r) => (
        <div key={r.id} className="launch-card">
          <h3>{r.name}</h3>
          <p>Country: {r.country}</p>
          <p>Stages: {r.stages}</p>
          <p>Boosters: {r.boosters}</p>
          <p>Cost per Launch: ${r.cost_per_launch.toLocaleString()}</p>
        </div>
      ))}
    </main>
  );
}
