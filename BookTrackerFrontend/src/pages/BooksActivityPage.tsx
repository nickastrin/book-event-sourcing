import { useParams } from "react-router";
import { useGetById, useUpdate } from "../features/books/queries";
import { BookService } from "../features/books/services";
import moment from "moment";
import { useState } from "react";
import { BooksUpsertModal, BookTimeline } from "@src/features/books";
import clsx from "clsx";

export const BooksActivityPage = () => {
  const [showModal, setShowModal] = useState(false);
  const service = new BookService();

  const { id } = useParams();
  const { data } = useGetById({ id: id!, service });

  const { updateEntry } = useUpdate({ service });

  return (
    <div
      className={clsx(
        "flex sm:flex-row gap-4 flex-1",
        "flex-col max-h-[80dvh]",
      )}
    >
      <div
        className={clsx(
          "relative border rounded-xl p-6",
          "max-w-[420px] bg-zinc-700 gap-6",
          "flex flex-col overflow-y-auto",
        )}
      >
        <h1 className="font-bold">{data?.title}</h1>
        <p className="text-lg">{data?.description}</p>

        <div
          className={clsx(
            "mt-auto flex flex-col gap-1",
            "text-sm text-body w-50 mx-auto",
          )}
        >
          <p>{moment(data?.publishDate).format("MMMM Do, YYYY")}</p>
          <p className="font-bold">{data?.authors.join(", ")}</p>
        </div>

        <button
          className="absolute bottom-0 right-0 m-4 flex justify-center icon"
          onClick={() => setShowModal(true)}
        >
          <span className="material-symbols-outlined block">edit</span>
        </button>
      </div>

      <BookTimeline id={id!} service={service} />

      <BooksUpsertModal
        show={showModal}
        initialValues={data}
        onClose={() => setShowModal(false)}
        onSubmit={async (data) => {
          const updateId = await updateEntry({ id: id!, data });
          setShowModal(false);

          return updateId;
        }}
      />
    </div>
  );
};
