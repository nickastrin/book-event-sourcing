import { useMemo } from "react";
import { useFilterContext } from "../contexts";
import { DEFAULT_PAGINATION } from "../types";

interface OptionsFilterProps {
  filterKey: string;
  options: string[];
}

export const OptionsFilter = ({ filterKey, options }: OptionsFilterProps) => {
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
    <div>
      {options.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            checked={activeValue?.includes(option) || false}
            onChange={() => onOptionToggle(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};
