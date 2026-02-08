import { useMemo } from "react";
import { useFilterContext } from "../contexts";
import { DEFAULT_PAGINATION } from "../types";
import { Dropdown } from "@src/components";
import { FilterLabel } from "./FilterLabel";

interface OptionsFilterProps {
  filterKey: string;
  label: string;
  icon?: string;
  options: string[];
}

export const OptionsFilter = ({
  filterKey,
  label,
  icon,
  options,
}: OptionsFilterProps) => {
  const { queryFilters, onUpdateQueryFilters } = useFilterContext();
  const filter = queryFilters.filters?.[filterKey] || null;

  const activeValue = useMemo(() => {
    if (!filter) return null;

    if (Array.isArray(filter.value)) {
      return filter.value;
    } else {
      return [filter.value];
    }
  }, [filter]);

  const onOptionToggle = (option: string) => {
    const newValue = activeValue?.includes(option)
      ? activeValue.filter((val) => val !== option)
      : [...(activeValue || []), option];

    onUpdateQueryFilters({
      filters: {
        ...queryFilters.filters,
        [filterKey]: {
          key: filterKey,
          value: newValue,
        },
      },
      pagination: {
        ...(queryFilters.pagination || DEFAULT_PAGINATION),
        page: 1,
      },
    });
  };

  return (
    <Dropdown label={<FilterLabel label={label} icon={icon} />}>
      <div className="max-h-60 overflow-y-auto p-4">
        {options.map((option) => (
          <div key={option}>
            <label className="flex items-center gap-2 p-2 w-full cursor-pointer">
              <input
                type="checkbox"
                value={option}
                className="accent-indigo-400"
                checked={activeValue?.includes(option) || false}
                onChange={() => onOptionToggle(option)}
              />
              <span className="truncate text-white">{option}</span>
            </label>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};
