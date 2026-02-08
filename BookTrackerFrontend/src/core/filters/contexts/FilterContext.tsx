import { createContext, useContext } from "react";
import type { QueryFilter } from "../types";

interface FilterContextValue {
  queryFilters: QueryFilter;
  onUpdateQueryFilters: (prev: QueryFilter) => void;
}

export const FilterContext = createContext<FilterContextValue | null>(null);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("Filter context must be used within its provider");
  }

  return context;
};
