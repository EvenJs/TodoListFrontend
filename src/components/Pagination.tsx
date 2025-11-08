import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { type PaginationInfo } from "../types/todo";

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  loading?: boolean;
}

const Pagination = ({
  pagination,
  onPageChange,
  onLimitChange,
  loading = false,
}: PaginationProps) => {
  const { page, totalPages, total, limit, hasNext, hasPrev } = pagination;

  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible pages
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      // Adjust if we're near the start
      if (page <= 3) {
        end = 4;
      }

      // Adjust if we're near the end
      if (page >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add visible pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  if (total === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 glass-card rounded-2xl"
    >
      {/* Items counter */}
      <div className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-semibold">
          {startItem}-{endItem}
        </span>{" "}
        of <span className="font-semibold">{total}</span> tasks
      </div>

      <div className="flex items-center gap-4">
        {/* Items per page selector */}
        {onLimitChange && (
          <div className="flex items-center gap-2">
            <label htmlFor="limit" className="text-sm text-gray-600">
              Show:
            </label>
            <select
              id="limit"
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              disabled={loading}
              className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        )}

        {/* Page navigation */}
        <div className="flex items-center gap-1">
          {/* Previous button */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrev || loading}
            className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          {pageNumbers.map((pageNumber, index) => (
            <div key={index}>
              {pageNumber === "..." ? (
                <div className="px-3 py-2 text-gray-400">
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              ) : (
                <button
                  onClick={() => onPageChange(pageNumber as number)}
                  disabled={loading}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    page === pageNumber
                      ? "bg-blue-500 text-white border-blue-500 shadow-md"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  } disabled:opacity-50`}
                >
                  {pageNumber}
                </button>
              )}
            </div>
          ))}

          {/* Next button */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNext || loading}
            className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Pagination;
