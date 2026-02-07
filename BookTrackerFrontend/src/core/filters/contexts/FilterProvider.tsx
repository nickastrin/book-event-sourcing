import { useState } from "react";
import { FilterContext } from "./FilterContext";
import type { QueryFilter } from "../types";

interface FilterProviderProps {
  children: React.ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filters, setFilters] = useState<QueryFilter>({
    search: "",
    filters: [],
    pagination: {
      page: 1,
      pageSize: 10,
    },
    orderBy: "",
  });

  return (
    <FilterContext.Provider value={{ filters, onUpdateFilters: setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
