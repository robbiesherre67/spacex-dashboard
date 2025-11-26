// Purpose:
// This page displays the FULL details of a single SpaceX launch.
// The user lands here by navigating from LaunchesPage.
// Architecture:
// 1. We read the launch ID from the URL.
// 2. We fetch that launch from the SpaceX API.
// 3. We display mission details, rocket name, patch image, date.
// 4. This demonstrates a professional master → detail pattern.

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Reusable formatter
function formatDate(d) {
  return new Date(d).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export default function LaunchDetailPage() {
  const { id } = useParams();
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLaunch() {
      try {
        const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
        const data = await res.json();
        setLaunch(data);
      } catch (e) {
        console.error("Failed to load launch", e);
      } finally {
        setLoading(false);
      }
    }

    fetchLaunch();
  }, [id]);

  if (loading) return <main><p>Loading launch...</p></main>;
  if (!launch) return <main><p>Launch not found.</p></main>;

  return (
    <main>
      <h1>{launch.name}</h1>
      <div
        style={{
          background: "var(--surface)",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 6px var(--card-shadow)",
          marginTop: "1rem"
        }}
      >
        {/* Mission Patch */}
        {launch.links?.patch?.large && (
          <img
            src={launch.links.patch.large}
            alt={`${launch.name} patch`}
            style={{ width: 180, marginBottom: "1rem" }}
          />
        )}

        <p><strong>Date:</strong> {formatDate(launch.date_utc)}</p>

        <p>
          <strong>Success:</strong>{" "}
          {launch.success ? (
            <span style={{ color: "green" }}>✔ Successful</span>
          ) : (
            <span style={{ color: "red" }}>✘ Failed</span>
          )}
        </p>

        <p>
          <strong>Rocket:</strong>{" "}
          <Link
            to={`/rocket/${launch.rocket}`}
            style={{ color: "var(--primary)" }}
          >
            View Rocket →
          </Link>
        </p>

<p>
  <strong>Launchpad:</strong>{" "}
  <Link
    to={`/launchpad/${launch.launchpad}`}
    style={{ color: "var(--primary)" }}
  >
    View Map →
  </Link>
</p>


        <p style={{ marginTop: "1rem", lineHeight: "1.6" }}>
          <strong>Details:</strong><br />
          {launch.details || "No mission details available."}
        </p>
        <p>
        <a href="/" style={{ color: "var(--primary)" }}>← Back to launches</a>
        </p>
      </div>
    </main>
  );
}
