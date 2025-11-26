// Purpose:
// A reusable card component for listing SpaceX launches.
// Why?
// - Show visual hierarchy
// - Show component reusability
// - Employers/Recruiters understand card-based design
// It's now clickable. When clicked, it sends the user to a full detail page.

import { Link } from "react-router-dom";

export default function LaunchCard({ launch }) {
  return (
    <Link
      to={`/launch/${launch.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="launch-card">
        <h2>{launch.name}</h2>
        <p>{new Date(launch.date_utc).toLocaleDateString()}</p>
        <p>{launch.details ? launch.details.slice(0, 120) + "..." : "No details available."}</p>
      </div>
    </Link>
  );
}

