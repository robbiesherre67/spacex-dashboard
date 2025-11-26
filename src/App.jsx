// Purpose:
// - Define top-level routing structure
// - Integrate LaunchesPage
// - Show scalable architecture

// GitHub Pages requires HashRouter (NOT BrowserRouter)
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LaunchesPage from "./pages/LaunchesPage";
import RocketsPage from "./pages/RocketsPage";
import ChartsPage from "./pages/ChartsPage";
import Navbar from "./components/Navbar";
import LaunchDetailPage from "./pages/LaunchDetailPage";
import RocketDetailPage from "./pages/RocketDetailPage";
import LaunchpadPage from "./pages/LaunchpadPage";
import RocketFleetPage from "./pages/RocketFleetPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LaunchesPage />} />
        <Route path="/rockets" element={<RocketsPage />} />
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/launch/:id" element={<LaunchDetailPage />} />
        <Route path="/rocket/:id" element={<RocketDetailPage />} />
        <Route path="/launchpad/:id" element={<LaunchpadPage />} />
        <Route path="/rockets-fleet" element={<RocketFleetPage />} />
      </Routes>
    </Router>
  );
}