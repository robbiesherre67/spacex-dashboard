// Purpose:
// A simple accessible nav allowing routing between pages.
// Uses semantic <nav> and <ul> for screen readers.
// This is React so NO <href> tags are used.

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background: "#fff", padding: "1rem", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li><Link to="/">Launches</Link></li>
        <li><Link to="/rockets">Rockets</Link></li>
        <li><Link to="/charts">Charts</Link></li>
      </ul>
    </nav>
  );
}
