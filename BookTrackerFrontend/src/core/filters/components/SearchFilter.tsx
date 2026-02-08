import { useMemo, useState } from "react";
import { useFilterContext } from "../contexts";
import { DEFAULT_PAGINATION } from "../types";
import { debounce } from "lodash";
import { Input } from "@src/components";

export const SearchFilter = () => {
  const { queryFilters, onUpdateQueryFilters } = useFilterContext();

  const [search, setSearch] = useState(queryFilters.search || "");

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        onUpdateQueryFilters({
          search: value,
          pagination: {
            ...(queryFilters.pagination || DEFAULT_PAGINATION),
            page: 1,
          },
        });
      }, 500),
    [onUpdateQueryFilters, queryFilters.pagination],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedUpdate(value);
  };

  return (
    <Input
      type="text"
      icon={"search"}
      value={search}
      onChange={onInputChange}
      placeholder="Search..."
    />
  );
};
