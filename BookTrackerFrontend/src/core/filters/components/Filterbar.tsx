import { AUTHORS } from "@src/features/authors";
import { OptionsFilter } from "./OptionsFilter";
import { SearchFilter } from "./SearchFilter";

export const Filterbar = () => {
  return (
    <>
      Filters <SearchFilter />
      <OptionsFilter filterKey="authors" options={AUTHORS} />
    </>
  );
};
