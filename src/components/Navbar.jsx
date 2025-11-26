// Purpose:
// - Fully responsive navbar
// - Hamburger menu at tablet/mobile widths
// - Dark/light toggle safely moves into right side without collision
// - Accessible: ARIA labels, keyboard focus, role="button"

import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen(!open);
  }

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 1.5rem",
        background: "var(--surface)",
        boxShadow: "0 2px 6px var(--card-shadow)",
        position: "sticky",
        top: 0,
        zIndex: 2000
      }}
    >
      {/* LEFT SIDE: Brand */}
      <div
        style={{
          fontFamily: "Raleway",
          fontWeight: 800,
          fontSize: "1.7rem",
          letterSpacing: "1px",
          color: "var(--text)"
        }}
      >
        SpaceX Dashboard
      </div>

      {/* HAMBURGER — shows only on mobile */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        style={{
          background: "none",
          border: "none",
          fontSize: "1.9rem",
          cursor: "pointer",
          color: "var(--text)",
          display: "none"
        }}
        className="hamburger-btn"
      >
        ☰
      </button>

      {/* NAV LINKS (Desktop + Mobile Drawer) */}
          <ul className={`nav-list ${open ? "open" : ""}`}>

        <li>
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "var(--primary)" : "var(--text)",
              fontWeight: isActive ? 700 : 500
            })}
          >
            Launches
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/launchpads"
            onClick={() => setOpen(false)}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "var(--primary)" : "var(--text)",
              fontWeight: isActive ? 700 : 500
            })}
          >
            Launchpads
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/rockets"
            onClick={() => setOpen(false)}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "var(--primary)" : "var(--text)",
              fontWeight: isActive ? 700 : 500
            })}
          >
            Rockets
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/charts"
            onClick={() => setOpen(false)}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "var(--primary)" : "var(--text)",
              fontWeight: isActive ? 700 : 500
            })}
          >
            Charts
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/rockets-fleet"
            onClick={() => setOpen(false)}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "var(--primary)" : "var(--text)",
              fontWeight: isActive ? 700 : 500
            })}
          >
            Rocket Fleet
          </NavLink>
        </li>

        <li>
        <NavLink
          to="/fleet-compare"
          onClick={() => setOpen(false)}
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "var(--primary)" : "var(--text)",
            fontWeight: isActive ? 700 : 500
          })}
        >
          Fleet Compare
        </NavLink>
       </li>

        {/* Theme toggle shows here on desktop + inside list on mobile */}
        <li className="theme-toggle-mobile">
          <ThemeToggle />
        </li>
      </ul>

      {/* RIGHT SIDE: theme toggle (desktop only) */}
      <div className="theme-toggle-desktop">
        <ThemeToggle />
      </div>
    </nav>
  );
}