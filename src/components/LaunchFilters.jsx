// Purpose:
// Provides search, filter, and sort controls for LaunchesPage.
// Emits state updates back upward so LaunchesPage handles filtering.
// Benefits:
// - Clean separation of concerns
// - Reusable toolbar component
// - WCAG-compliant colors, fully theme-aware

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
    <div className="filter-panel">
      
      {/* Mission Name Search */}
      <label>
        <strong>Search Missions:</strong>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by mission name..."
        />
      </label>

      {/* Year Filter */}
      <label>
        <strong>Filter by Year:</strong>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </label>

      {/* Sort Order */}
      <label>
        <strong>Sort by Date:</strong>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </label>

    </div>
  );
}
