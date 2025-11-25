// Purpose:
// A reusable card component for listing SpaceX launches.
// Why?
// - Show visual hierarchy
// - Show component reusability
// - Employers/Recruiters understand card-based design

export default function LaunchCard({ launch }) {
  return (
    <div className="launch-card">
      <h3>{launch.name}</h3>
      <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
      <p>Flight Number: {launch.flight_number}</p>
    </div>
  );
}
