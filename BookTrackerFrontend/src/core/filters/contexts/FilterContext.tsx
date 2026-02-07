import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { QueryFilter } from "../types";

interface FilterContextValue {
  filters: QueryFilter;
  onUpdateFilters: Dispatch<SetStateAction<QueryFilter>>;
}

export const FilterContext = createContext<FilterContextValue | null>(null);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("Filter context must be used within its provider");
  }

  return context;
};
