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
import { fetchLaunchById } from "../api/spacexApi";

export default function LaunchDetailPage() {
  // useParams gives us the dynamic route part from the URL
  const { id } = useParams();

  // Local state: this does NOT need Redux since it's single-item data
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLaunch() {
      try {
        const { data } = await fetchLaunchById(id);
        setLaunch(data);
      } catch (error) {
        console.error("Error fetching launch:", error);
      }
      setLoading(false);
    }

    loadLaunch();
  }, [id]);

  if (loading) return <p>Loading launch details...</p>;
  if (!launch) return <p>Launch not found.</p>;

  return (
    <main>
      <h1>{launch.name}</h1>

      {/* Mission patch */}
      {launch.links.patch.large && (
        <img
          src={launch.links.patch.large}
          alt={`${launch.name} mission patch`}
          style={{ width: "200px", marginBottom: "1rem" }}
        />
      )}

      <p><strong>Date:</strong> {new Date(launch.date_utc).toLocaleString()}</p>
      <p><strong>Flight Number:</strong> {launch.flight_number}</p>
      <p><strong>Success:</strong> {launch.success ? "Yes" : "No"}</p>

      {/* Details */}
      {launch.details && (
        <p style={{ marginTop: "1rem" }}>
          <strong>Details:</strong> {launch.details}
        </p>
      )}

      {/* Back Button */}
      <button
        className="button"
        onClick={() => window.history.back()}
        style={{ marginTop: "1.5rem" }}
      >
        ← Back to Launches
      </button>
    </main>
  );
}
