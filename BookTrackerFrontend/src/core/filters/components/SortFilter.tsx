import { Dropdown } from "@src/components";
import type { Option } from "../../types";
import { useFilterContext } from "../contexts";
import { FilterLabel } from "./FilterLabel";
import "./SortFilter.css";
import clsx from "clsx";

interface SortFilterProps {
  sortableFields: Option[];
}

export const SortFilter = ({ sortableFields }: SortFilterProps) => {
  const { queryFilters, onUpdateQueryFilters } = useFilterContext();

  const activeSort = queryFilters.orderBy?.split(" ")[0] || null;
  const isDescending = queryFilters.orderBy?.endsWith("desc") || false;

  const handleChange = (key: string, isDescending: boolean = false) => {
    const sortValue = isDescending ? `${key} desc` : key;

    onUpdateQueryFilters({
      ...queryFilters,
      orderBy: sortValue,
    });
  };

  return (
    <Dropdown label={<FilterLabel label="Sort" icon={"sort"} />}>
      <div className="overflow-y-hidden">
        <div className="p-4 border-b">
          <p className="font-bold">Order by:</p>
        </div>
        <div className="p-4 flex flex-col gap-4 max-h-60 overflow-y-auto">
          {sortableFields.map((field) => (
            <div key={field.value} className="flex items-center gap-4">
              <span>{field.label}</span>
              <div className="flex flex-row gap-2 ms-auto">
                <button
                  className={clsx("sort-button icon flex items-center", {
                    active: activeSort === field.value && !isDescending,
                  })}
                  onClick={() => handleChange(field.value)}
                >
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </button>
                <button
                  className={clsx("sort-button icon flex items-center", {
                    active: activeSort === field.value && isDescending,
                  })}
                  onClick={() => handleChange(field.value, true)}
                >
                  <span className="material-symbols-outlined">
                    arrow_downward
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dropdown>
  );
};
