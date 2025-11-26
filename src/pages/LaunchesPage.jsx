// Purpose:
// - Display all SpaceX launches using Redux global state
// - Demonstrates loading states, API fetch, error UI
// - Senior-level UI/UX patterns (conditional rendering)
// - Local search, filter, and sort controls
// - Pagination with reset when filters change

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLaunches } from "../features/launches/launchesSlice";
import LaunchCard from "../components/LaunchCard";
import LaunchFilters from "../components/LaunchFilters";
import Pagination from "../components/Pagination";

export default function LaunchesPage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.launches);

  // FILTER STATE
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("newest");

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch launches from API
  useEffect(() => {
    dispatch(getLaunches());
  }, [dispatch]);

  // Reset page when filters update
  useEffect(() => {
    setCurrentPage(1);
  }, [search, year, sort]);

  // LOADING / ERROR
  if (loading) return <p>Loading launches...</p>;
  if (error) return <p>Error loading launches.</p>;

  // Unique list of years for filter dropdown
  const years = [...new Set(data.map((l) => new Date(l.date_utc).getFullYear()))].sort();

  // ------------------------------
  // FILTER + SORT PIPELINE
  // ------------------------------
  let filtered = [...data];

  if (search.trim() !== "") {
    filtered = filtered.filter((l) =>
      l.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (year !== "") {
    filtered = filtered.filter((l) => {
      const y = new Date(l.date_utc).getFullYear();
      return String(y) === String(year);
    });
  }

  filtered = filtered.sort((a, b) => {
    const da = new Date(a.date_utc);
    const db = new Date(b.date_utc);
    return sort === "newest" ? db - da : da - db;
  });

  // ------------------------------
  // PAGINATION SLICE
  // ------------------------------
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  // ------------------------------

  return (
    <main>
      <h1>SpaceX Launches</h1>

      {/* FILTERS */}
      <LaunchFilters
        search={search}
        setSearch={setSearch}
        year={year}
        setYear={setYear}
        sort={sort}
        setSort={setSort}
        years={years}
      />

      {/* RESULTS */}
      {paginated.length === 0 && <p>No launches found.</p>}

      {paginated.map((launch) => (
        <LaunchCard key={launch.id} launch={launch} />
      ))}

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
