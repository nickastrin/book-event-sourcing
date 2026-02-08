import { Dropdown } from "@src/components";
import {
  DateFilter,
  FilterLabel,
  OptionsFilter,
  SearchFilter,
  SortFilter,
} from "@src/core";
import { AUTHORS } from "@src/features/authors";

export const BooksFilterbar = () => {
  return (
    <div className="flex flex-row items-center gap-4 flex-wrap">
      <div className="me-auto">
        <SearchFilter />
      </div>

      <Dropdown
        label={<FilterLabel label="Publish Date" icon={"calendar_month"} />}
      >
        <div className="p-4 flex flex-col gap-4">
          <DateFilter filterKey="minPublishDate" label="Min Publish Date" />
          <DateFilter filterKey="maxPublishDate" label="Max Publish Date" />
        </div>
      </Dropdown>

      <OptionsFilter
        filterKey="authors"
        label="Authors"
        icon="person_edit"
        options={AUTHORS}
      />

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
          {
            value: "createdAt",
            label: "Created At",
          },
          {
            value: "lastUpdatedAt",
            label: "Last Updated At",
          },
        ]}
      />
    </div>
  );
};
