// Purpose:
// A charts dashboard that computes statistics from launches.
// Demonstrates:
// - Derived state
// - Transforming API data
// - Using Recharts
// - Complex UI view

import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ChartsPage() {
  const launches = useSelector((state) => state.launches.data);

  // Derive "launches per year"
  const launchesByYear = launches.reduce((acc, launch) => {
    const year = new Date(launch.date_utc).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // Convert object → array
  const chartData = Object.entries(launchesByYear).map(([year, count]) => ({
    year,
    count
  }));

  return (
    <main>
      <h1>Launch Statistics</h1>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#005eff" />
        </BarChart>
      </ResponsiveContainer>
    </main>
  );
}
