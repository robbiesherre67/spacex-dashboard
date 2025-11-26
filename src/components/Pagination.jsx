// Purpose:
// Clean, truncated pagination for large datasets.
// Shows:
// - First page
// - Last page
// - Current page
// - Pages around current (previous/next)
// - Ellipsis when skipping ranges
// - Accessible Prev/Next buttons
// Works with your existing props.

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages
}) {
  if (totalPages <= 1) return null;

  // Build dynamic pagination pattern
  const pages = [];

  // Always show first page
  if (currentPage !== 1) pages.push(1);

  // Add left ellipsis
  if (currentPage > 3) pages.push("left-ellipsis");

  // Pages around current
  for (let p = currentPage - 1; p <= currentPage + 1; p++) {
    if (p > 1 && p < totalPages) {
      pages.push(p);
    }
  }

  // Add right ellipsis
  if (currentPage < totalPages - 2) pages.push("right-ellipsis");

  // Always show last page
  if (currentPage !== totalPages) pages.push(totalPages);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "0.5rem",
        marginTop: "2rem",
        flexWrap: "wrap"
      }}
    >
      {/* PREV BUTTON */}
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        ‹ Prev
      </button>

      {/* PAGE NUMBERS */}
      {pages.map((p, idx) => {
        if (p === "left-ellipsis" || p === "right-ellipsis") {
          return (
            <span key={idx} style={{ padding: "0.45rem 0.6rem" }}>
              …
            </span>
          );
        }

        return (
          <button
            key={idx}
            className={`page-btn ${currentPage === p ? "active" : ""}`}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </button>
        );
      })}

      {/* NEXT BUTTON */}
      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next ›
      </button>
    </div>
  );
}
