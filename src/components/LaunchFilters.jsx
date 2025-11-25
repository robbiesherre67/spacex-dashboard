// Purpose:
// This component provides search, filter, and sorting controls for the LaunchesPage.
// It emits events (callbacks) back to the parent so LaunchesPage can filter the data.
// Why separate component?
// - Cleaner LaunchesPage (separation of concerns)
// - Reusable toolbar pattern
// - Senior-level architecture

export default function LaunchFilters({
  search,
  setSearch,
  year,
  setYear,
  sort,
  setSort,
  years
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1.2rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      {/* Mission Name Search */}
      <label style={{ display: "block", marginBottom: "0.6rem" }}>
        <strong>Search Missions:</strong>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by mission name..."
          style={{
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.4rem",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
      </label>

      {/* Year Filter */}
      <label style={{ display: "block", marginBottom: "0.6rem" }}>
        <strong>Filter by Year:</strong>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.4rem",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </label>

      {/* Sort Order */}
      <label style={{ display: "block" }}>
        <strong>Sort by Date:</strong>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.4rem",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </label>
    </div>
  );
}
