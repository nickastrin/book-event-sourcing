import { OptionsFilter, SearchFilter, SortFilter } from "@src/core";
import { AUTHORS } from "@src/features/authors";

export const BooksFilterbar = () => {
  return (
    <>
      Filters <SearchFilter />
      <OptionsFilter filterKey="authors" options={AUTHORS} />
      <SortFilter
        sortableFields={[
          {
            value: "title",
            label: "Title",
          },
          {
            value: "publishDate",
            label: "Publish Date",
          },
        ]}
      />
    </>
  );
};
