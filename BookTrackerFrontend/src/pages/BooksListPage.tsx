import { FilterProvider } from "../core";
import { BookService, BooksFilterbar, BooksTable } from "../features/books";

export const BooksListPage = () => {
  const service = new BookService();

  return (
    <FilterProvider>
      <BooksFilterbar />
      <BooksTable service={service} />
    </FilterProvider>
  );
};
