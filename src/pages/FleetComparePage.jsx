// Purpose:
// - Compare Falcon 9, Falcon Heavy, and Starship
// - Pulls data from SpaceX API
// - Normalizes missing values
// - Displays a responsive comparison table
// - ADA friendly with semantic <table>, <caption>, headers

import { useEffect, useState } from "react";

export default function FleetComparePage() {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);

  // IDs for Falcon 9, Falcon Heavy, Starship
  const TARGETS = {
    "Falcon 9": "5e9d0d95eda69973a809d1ec",
    "Falcon Heavy": "5e9d0d95eda69974db09d1ed",
    "Starship": "5e9d0d96eda699382d09d1ee"
  };

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://api.spacexdata.com/v4/rockets");
        const data = await res.json();

        const filtered = data.filter(r => Object.values(TARGETS).includes(r.id));
        setFleet(filtered);
      } catch (err) {
        console.error("Fleet load failed:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <main><p>Loading fleet comparison...</p></main>;

  return (
    <main>
      <h1>Rocket Fleet Comparison</h1>

      <div
        style={{
          overflowX: "auto",
          marginTop: "1.5rem",
          boxShadow: "0 2px 6px var(--card-shadow)",
          borderRadius: "8px"
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "var(--surface)",
            color: "var(--text)"
          }}
        >
          <caption
            style={{
              textAlign: "left",
              padding: "1rem",
              fontWeight: 700,
              fontSize: "1.2rem"
            }}
          >
            Comparison of SpaceX Heavy-Lift Vehicles
          </caption>

          <thead>
            <tr style={{ background: "var(--bg)" }}>
              <th style={th}>Spec</th>
              {fleet.map(r => (
                <th key={r.id} style={th}>{r.name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <Row label="Height (m)" fleet={fleet} get={r => r.height.meters} />
            <Row label="Diameter (m)" fleet={fleet} get={r => r.diameter.meters} />
            <Row label="Mass (kg)" fleet={fleet} get={r => r.mass.kg} />
            <Row label="Boosters" fleet={fleet} get={r => r.boosters} />
            <Row label="Stages" fleet={fleet} get={r => r.stages} />
            <Row label="Cost per Launch ($)" fleet={fleet} get={r => r.cost_per_launch?.toLocaleString()} />
          </tbody>
        </table>
      </div>
    </main>
  );
}

// Shared table header style
const th = {
  textAlign: "left",
  padding: "0.85rem 1rem",
  fontWeight: 700,
  borderBottom: "1px solid #ddd"
};

// Dynamic row component
function Row({ label, fleet, get }) {
  return (
    <tr>
      <td style={tdLabel}>{label}</td>
      {fleet.map(r => (
        <td key={r.id} style={tdValue}>
          {get(r) ?? "—"}
        </td>
      ))}
    </tr>
  );
}

const tdLabel = {
  padding: "0.8rem 1rem",
  fontWeight: 600,
  borderBottom: "1px solid #eee"
};

const tdValue = {
  padding: "0.8rem 1rem",
  borderBottom: "1px solid #eee"
};
