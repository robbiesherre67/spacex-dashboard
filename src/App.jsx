// Purpose:
// - Define top-level routing structure
// - Integrate LaunchesPage
// - Show scalable architecture

// GitHub Pages requires HashRouter (NOT BrowserRouter)
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import LaunchesPage from "./pages/LaunchesPage";
import RocketsPage from "./pages/RocketsPage";
import ChartsPage from "./pages/ChartsPage";
import LaunchDetailPage from "./pages/LaunchDetailPage";
import RocketDetailPage from "./pages/RocketDetailPage";
import LaunchpadPage from "./pages/LaunchpadPage";
import RocketFleetPage from "./pages/RocketFleetPage";
import LaunchpadMapPage from "./pages/LaunchpadMapPage";
import FleetComparePage from "./pages/FleetComparePage";

import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Launches */}
        <Route path="/" element={<LaunchesPage />} />
        <Route path="/launch/:id" element={<LaunchDetailPage />} />

        {/* Rockets */}
        <Route path="/rockets" element={<RocketsPage />} />
        <Route path="/rocket/:id" element={<RocketDetailPage />} />
        <Route path="/rockets-fleet" element={<RocketFleetPage />} />

        {/* Charts */}
        <Route path="/charts" element={<ChartsPage />} />

        {/* Launchpads (we will build in Step 2) */}
        <Route path="/launchpads/:id" element={<LaunchpadPage />} />
        <Route path="/launchpads" element={<LaunchpadMapPage />} />

        <Route path="/fleet-compare" element={<FleetComparePage />} />

      </Routes>

    </Router>
  );
}