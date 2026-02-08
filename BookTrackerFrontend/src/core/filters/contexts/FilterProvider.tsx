import { useState } from "react";
import { FilterContext } from "./FilterContext";
import type { QueryFilter } from "../types";

interface FilterProviderProps {
  children: React.ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [queryFilters, setQueryFilters] = useState<QueryFilter>({
    search: "",
    filters: {},
    pagination: {
      page: 1,
      pageSize: 10,
    },
    orderBy: "",
  });

  const onUpdateQueryFilters = (filters: Partial<QueryFilter>) => {
    setQueryFilters((prev) => ({
      ...prev,
      ...filters,
    }));
  };

  return (
    <FilterContext.Provider value={{ queryFilters, onUpdateQueryFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
