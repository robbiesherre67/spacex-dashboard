// Purpose:
// - Define top-level routing structure
// - Integrate LaunchesPage
// - Show scalable architecture

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LaunchesPage from "./pages/LaunchesPage";
import RocketsPage from "./pages/RocketsPage";
import ChartsPage from "./pages/ChartsPage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LaunchesPage />} />
        <Route path="/rockets" element={<RocketsPage />} />
        <Route path="/charts" element={<ChartsPage />} />
      </Routes>
    </Router>
  );
}
