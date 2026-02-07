import type { Option } from "../../types";
import { useFilterContext } from "../contexts";

interface SortFilterProps {
  sortableFields: Option[];
}

export const SortFilter = ({ sortableFields }: SortFilterProps) => {
  const { queryFilters, onUpdateQueryFilters } = useFilterContext();

  const handleChange = (key: string, isDescending: boolean = false) => {
    const sortValue = isDescending ? `${key} desc` : key;

    onUpdateQueryFilters({
      ...queryFilters,
      orderBy: sortValue,
    });
  };

  return (
    <div>
      {sortableFields.map((field) => (
        <div key={field.value}>
          <span>{field.label}</span>
          <button onClick={() => handleChange(field.value)}>Asc</button>
          <button onClick={() => handleChange(field.value, true)}>Desc</button>
        </div>
      ))}
    </div>
  );
};
