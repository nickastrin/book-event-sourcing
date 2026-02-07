import { Filterbar, FilterProvider } from "../core";
import { BookService, BooksTable } from "../features/books";

export const BooksListPage = () => {
  const service = new BookService();

  return (
    <FilterProvider>
      <Filterbar />
      <BooksTable service={service} />
    </FilterProvider>
  );
};
