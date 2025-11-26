// Purpose:
// - Generic reusable Chart.js wrapper for all rocket charts
// - Accepts config + dataset
// - Cleans up on unmount to avoid memory leaks

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function RocketChart({ config }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current, config);
    }

    return () => {
      chartRef.current?.destroy();
    };
  }, [config]);

  return (
    <div style={{ marginBottom: "2rem" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
