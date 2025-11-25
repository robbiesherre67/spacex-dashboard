// Purpose:
// - Define top-level routing structure
// - Integrate LaunchesPage
// - Show scalable architecture

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LaunchesPage from "./pages/LaunchesPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchesPage />} />
      </Routes>
    </Router>
  );
}
