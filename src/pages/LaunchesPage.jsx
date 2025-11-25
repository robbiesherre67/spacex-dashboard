// Purpose:
// - Display all SpaceX launches using Redux global state
// - Demonstrates loading states, API fetch, error UI
// - Senior-level UI/UX patterns (conditional rendering)
// - This page loads all launches from Redux then applies:
// - Search (mission name)
// - Filter by year
// - Sort by date (asc/desc)
// This demonstrates real world dashboard filtering logic.

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLaunches } from "../features/launches/launchesSlice";
import LaunchCard from "../components/LaunchCard";
import LaunchFilters from "../components/LaunchFilters";

export default function LaunchesPage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.launches);

  // Local filter state
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    dispatch(getLaunches());
  }, [dispatch]);

  if (loading) return <p>Loading launches...</p>;
  if (error) return <p>Error loading launches.</p>;

  // Extract unique years from launch data
  const years = [...new Set(data.map(l => new Date(l.date_utc).getFullYear()))].sort();

  // FILTERING AND SORTING PIPELINE
  let filtered = data;

  // 1. Search by mission name
  if (search.trim() !== "") {
    filtered = filtered.filter((l) =>
      l.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 2. Filter by year
  if (year !== "") {
    filtered = filtered.filter((l) => {
      const y = new Date(l.date_utc).getFullYear();
      return String(y) === String(year);
    });
  }

  // 3. Sort
  filtered = filtered.sort((a, b) => {
    const da = new Date(a.date_utc);
    const db = new Date(b.date_utc);

    if (sort === "newest") return db - da;
    return da - db;
  });

  return (
    <main>
      <h1>SpaceX Launches</h1>

      {/* Filter Toolbar */}
      <LaunchFilters
        search={search}
        setSearch={setSearch}
        year={year}
        setYear={setYear}
        sort={sort}
        setSort={setSort}
        years={years}
      />

      {/* Results */}
      {filtered.length === 0 && <p>No launches found.</p>}

      {filtered.map((launch) => (
        <LaunchCard key={launch.id} launch={launch} />
      ))}
    </main>
  );
}
