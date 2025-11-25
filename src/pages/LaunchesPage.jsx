// Purpose:
// - Display all SpaceX launches using Redux global state
// - Demonstrates loading states, API fetch, error UI
// - Senior-level UI/UX patterns (conditional rendering)

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLaunches } from "../features/launches/launchesSlice";
import LaunchCard from "../components/LaunchCard";

export default function LaunchesPage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.launches);

  useEffect(() => {
    dispatch(getLaunches());
  }, [dispatch]);

  if (loading) return <p>Loading launches...</p>;
  if (error) return <p>Error loading launches.</p>;

  return (
    <main>
      <h1>SpaceX Launches</h1>
      {data.map((launch) => (
        <LaunchCard key={launch.id} launch={launch} />
      ))}
    </main>
  );
}
