// Purpose:
// - Fully responsive navbar
// - Hamburger menu at tablet/mobile widths
// - Dark/light toggle safely moves into right side without collision
// - Accessible: ARIA labels, keyboard focus, role="button"
// Purpose:
// - Fully responsive, accessible navbar
// - HashRouter-safe for GitHub Pages
// - Active link highlighting
// - Hamburger menu for mobile/tablet
// - Brand is NON-clickable to avoid wrong navigation on GH Pages

import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen(!open);
  }

  function closeMenu() {
    setOpen(false);
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
      {/* BRAND (not a link → prevents wrong redirects on GitHub Pages) */}
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

      {/* HAMBURGER BUTTON (mobile) */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        className="hamburger-btn"
        style={{
          background: "none",
          border: "none",
          fontSize: "1.9rem",
          cursor: "pointer",
          color: "var(--text)",
          display: "none"
        }}
      >
        ☰
      </button>

      {/* NAV LINKS (Desktop + Mobile) */}
      <ul className={`nav-list ${open ? "open" : ""}`}>
        <li>
          <NavLink
            to="/"
            onClick={closeMenu}
            className="nav-link"
          >
            Launches
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/launchpads"
            onClick={closeMenu}
            className="nav-link"
          >
            Launchpads
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/rockets"
            onClick={closeMenu}
            className="nav-link"
          >
            Rockets
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/charts"
            onClick={closeMenu}
            className="nav-link"
          >
            Charts
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/rockets-fleet"
            onClick={closeMenu}
            className="nav-link"
          >
            Rocket Fleet
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/fleet-compare"
            onClick={closeMenu}
            className="nav-link"
          >
            Fleet Compare
          </NavLink>
        </li>

        {/* MOBILE THEME TOGGLE */}
        <li className="theme-toggle-mobile">
          <ThemeToggle />
        </li>
      </ul>

      {/* DESKTOP THEME TOGGLE */}
      <div className="theme-toggle-desktop">
        <ThemeToggle />
      </div>
    </nav>
  );
}
