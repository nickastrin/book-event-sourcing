import { DEFAULT_PAGINATION, useFilterContext } from "@src/core";
import clsx from "clsx";

interface GridPaginationProps {
  totalCount: number;
}

export const GridPagination = ({ totalCount }: GridPaginationProps) => {
  const { queryFilters, onUpdateQueryFilters } = useFilterContext();
  const { page, pageSize } = queryFilters.pagination || DEFAULT_PAGINATION;

  const onPageChange = (newPage: number) => {
    onUpdateQueryFilters({
      ...queryFilters,
      pagination: {
        pageSize,
        page: newPage,
      },
    });
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex flex-row w-full items-center gap-1">
      <span>Total Entries:</span>
      <span className="font-bold text-indigo-300"> {totalCount}</span>

      <div className="ms-auto flex items-center gap-2">
        <button
          className={clsx("icon flex items-center", {
            "pointer-events-none opacity-50": page === 1,
          })}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className={clsx("icon flex items-center", {
            "pointer-events-none opacity-50": page >= totalPages,
          })}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
};
