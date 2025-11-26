// Purpose:
// A charts dashboard that computes statistics from launches.
// Demonstrates:
// - Derived state
// - Transforming API data
// - Using Recharts
// - Complex UI view
// - Render launch analytics using Recharts
// - Aggregates launch data by year (total, success, failed)
// - Theme-aware (works in dark/light mode)
// - Uses launches already loaded in Redux (no refetch)
// *** Updated ->
// - Displays 3 high-value aerospace analytics charts
// - Pulls live rocket data from /v4/rockets
// - Normalizes missing fields
// - Demonstrates senior-level data visualization

import { useEffect, useState } from "react";
import RocketChart from "../components/RocketChart";

export default function ChartsPage() {
  const [rockets, setRockets] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://api.spacexdata.com/v4/rockets");
        const data = await res.json();
        setRockets(data);
      } catch (err) {
        console.error("Failed to fetch chart data", err);
      }
    }

    load();
  }, []);

  if (rockets.length === 0) {
    return <main><p>Loading rocket analytics…</p></main>;
  }

  // Rocket names
  const labels = rockets.map(r => r.name);

  // Chart 1 — Thrust-to-Weight Ratio
  const thrustData = rockets.map(r => r.first_stage.thrust_sea_level.kN);
  const massData = rockets.map(r => r.mass.kg / 1000);
  const thrustWeightRatio = rockets.map((_, i) =>
    (thrustData[i] / massData[i]).toFixed(2)
  );

  const chart1 = {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Thrust-to-Weight Ratio",
        data: thrustWeightRatio,
        backgroundColor: "rgba(0, 94, 255, 0.65)"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Thrust-to-Weight Ratio" }
      }
    }
  };

  // Chart 2 — Payload to LEO
  const payloadData = rockets.map(r => r.payload_weights?.find(p => p.id === "leo")?.kg || 0);

  const chart2 = {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Payload to LEO (kg)",
        data: payloadData,
        backgroundColor: "rgba(75, 168, 255, 0.65)"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Payload to Low Earth Orbit (kg)" }
      }
    }
  };

  // Chart 3 — Height vs Mass Bubble Plot
  const bubbleData = rockets.map(r => ({
    label: r.name,
    data: [{
      x: r.height.meters,
      y: r.mass.kg / 1000,
      r: r.diameter.meters * 3 // scale radius
    }]
  }));

  const chart3 = {
    type: "bubble",
    data: {
      datasets: bubbleData.map(d => ({
        ...d,
        backgroundColor: "rgba(0, 94, 255, 0.45)"
      }))
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Height vs Mass (bubble size = diameter)"
        }
      },
      scales: {
        x: { title: { display: true, text: "Height (m)" } },
        y: { title: { display: true, text: "Mass (tons)" } }
      }
    }
  };

  return (
    <main>
      <h1>Rocket Performance Analytics</h1>

      <RocketChart config={chart1} />
      <RocketChart config={chart2} />
      <RocketChart config={chart3} />
    </main>
  );
}
