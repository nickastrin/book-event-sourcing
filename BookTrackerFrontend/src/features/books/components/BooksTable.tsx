import type { ColumnDef } from "@tanstack/react-table";
import { useGetAll } from "../queries";
import type { BookService } from "../services";
import type { Book } from "../types";
import { Grid } from "@src/views";
import { createSearchParams, useFilterContext } from "@src/core";
import { useMemo } from "react";

interface BooksTableProps {
  service: BookService;
}

export const BooksTable = ({ service }: BooksTableProps) => {
  const { queryFilters } = useFilterContext();
  const queryParams = useMemo(
    () => createSearchParams(queryFilters),
    [queryFilters],
  );

  const { data, totalCount } = useGetAll({
    params: queryParams,
    service,
  });

  const columns: ColumnDef<Book>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "publishDate",
      header: "Publish Date",
    },
    {
      accessorFn: (row) => row.authors.join(", "),
      header: "Authors",
    },
  ];

  return <Grid columns={columns} data={data} totalCount={totalCount} />;
};
