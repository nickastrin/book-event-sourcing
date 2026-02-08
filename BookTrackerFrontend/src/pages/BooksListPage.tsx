import { useState } from "react";
import { FilterProvider } from "../core";
import {
  BookService,
  BooksFilterbar,
  BooksTable,
  BooksUpsertModal,
} from "../features/books";
import { useCreate } from "@src/features/books/queries";

export const BooksListPage = () => {
  const service = new BookService();
  const { createEntry } = useCreate({ service });

  const [showModal, setShowModal] = useState(false);

  return (
    <FilterProvider>
      <div className="flex flex-col gap-4 h-full">
        <BooksFilterbar />
        <BooksTable service={service} />
      </div>

      <button
        className="fixed bottom-0 right-0 m-4 flex justify-center icon z-50"
        onClick={() => setShowModal(true)}
      >
        <span className="material-symbols-outlined block">add</span>
      </button>

      <BooksUpsertModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={async (data) => {
          const id = await createEntry({ data });
          setShowModal(false);

          return id;
        }}
      />
    </FilterProvider>
  );
};
