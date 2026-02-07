import type { ColumnDef } from "@tanstack/react-table";
import { useGetAll } from "../queries";
import type { BookService } from "../services";
import type { Book } from "../types";
import { Grid } from "../../../views";
import { useFilterContext } from "../../../core";
import { useMemo } from "react";

interface BooksTableProps {
  service: BookService;
}

export const BooksTable = ({ service }: BooksTableProps) => {
  const { queryFilters } = useFilterContext();
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (queryFilters.search) {
      params.append("search", queryFilters.search);
    }
    if (queryFilters.pagination) {
      params.append("page", queryFilters.pagination.page.toString());
      params.append("pageSize", queryFilters.pagination.pageSize.toString());
    }
    if (queryFilters.orderBy) {
      params.append("orderBy", queryFilters.orderBy);
    }

    return params.toString();
  }, [queryFilters]);

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
      header: "Author",
    },
  ];

  return <Grid columns={columns} data={data} totalCount={totalCount} />;
};
