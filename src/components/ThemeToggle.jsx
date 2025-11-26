// Purpose: Button to toggle light/dark theme.

import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="button"
      style={{
        marginLeft: "auto",
        background: "var(--primary)",
        borderRadius: "6px"
      }}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
