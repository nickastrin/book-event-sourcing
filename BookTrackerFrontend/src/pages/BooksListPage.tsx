import type { ColumnDef } from "@tanstack/react-table";
import { useGetAll } from "../features/books/queries";
import { BookService } from "../features/books/services";
import type { Book } from "../features/books/types";
import { Grid } from "../views";

export const BooksListPage = () => {
  const service = new BookService();
  const { data, totalCount } = useGetAll({
    params: new URLSearchParams({ page: "1", pageSize: "10" }),
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

  return (
    <>
      <Grid columns={columns} data={data} totalCount={totalCount} />
    </>
  );
};
