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

import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ChartsPage() {
  const { data, loading, error } = useSelector((state) => state.launches);

  if (loading) {
    return (
      <main>
        <p>Loading launch statistics...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p>Error loading launch statistics.</p>
      </main>
    );
  }

  // -------------------------------------------------------
  // Transform launch data into yearly totals
  // -------------------------------------------------------
  const yearMap = {};

  data.forEach((launch) => {
    const year = new Date(launch.date_utc).getFullYear();

    if (!yearMap[year]) {
      yearMap[year] = {
        year,
        total: 0,
        success: 0,
        failed: 0,
      };
    }

    yearMap[year].total++;

    if (launch.success === true) {
      yearMap[year].success++;
    }

    if (launch.success === false) {
      yearMap[year].failed++;
    }
  });

  const chartData = Object.values(yearMap).sort((a, b) => a.year - b.year);

  return (
    <main>
      <h1>Launch Statistics</h1>

      <div
        style={{
          background: "var(--surface)",
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 2px 6px var(--card-shadow)",
          marginTop: "1.5rem",
          height: "450px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="year" stroke="var(--text)" />
            <YAxis stroke="var(--text)" />

            <Tooltip
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid #ccc",
                color: "var(--text)",
              }}
            />

            <Legend />

            <Bar dataKey="total" fill="#8884d8" name="Total" />
            <Bar dataKey="success" fill="#82ca9d" name="Success" />
            <Bar dataKey="failed" fill="#ff6b6b" name="Failed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}