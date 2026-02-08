import { useParams } from "react-router";
import {
  useGetById,
  useGetHistory,
  useUpdate,
} from "../features/books/queries";
import { BookService } from "../features/books/services";
import moment from "moment";
import { useState } from "react";
import { BooksUpsertModal, extractEventDetails } from "@src/features/books";
import clsx from "clsx";

export const BooksActivityPage = () => {
  const [showModal, setShowModal] = useState(false);
  const service = new BookService();

  const { id } = useParams();
  const { data } = useGetById({ id: id!, service });

  const { data: history } = useGetHistory({
    id: id!,
    service,
  });

  const { updateEntry } = useUpdate({ service });

  return (
    <div className="flex flex-row gap-4 flex-1 max-h-[80dvh]">
      <div className="border rounded-xl p-4 basis-1/3 bg-zinc-700">
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
        <p>{moment(data?.publishDate).format("MMMM Do, YYYY")}</p>
        <p>{data?.authors.join(", ")}</p>
      </div>

      <div className="border rounded-xl w-[400px] overflow-hidden">
        <div className="rounded-xl p-4 size-full overflow-y-auto text-start">
          <ol className="relative border-s border-default">
            {history.reverse().map((event, index) => {
              const details = extractEventDetails(event);
              return (
                <li key={index} className="mb-10 ms-4">
                  <div
                    className={clsx(
                      "absolute w-3 h-3 bg-indigo-300 rounded-full",
                      "mt-1.5 -start-1.5 border-2 border-buffer border-zinc-900",
                    )}
                  />

                  <time
                    className={clsx(
                      "text-sm font-normal leading-none text-body",
                      "bg-indigo-500/30 px-2 py-1 rounded-md text-indigo-50",
                    )}
                  >
                    {moment
                      .utc(event.modifiedAt)
                      .local()
                      .format("MMMM Do YYYY, h:mm:ss a")}
                  </time>

                  <h3 className="text-lg font-semibold text-heading my-2">
                    {details.title}
                  </h3>

                  <p
                    className={clsx(
                      "mb-4 text-sm font-normal text-body",
                      "flex flex-row flex-wrap",
                    )}
                  >
                    <span>{details.message}</span>
                    {details?.change && (
                      <span className="font-bold ms-1 text-indigo-100">
                        {details.change}
                      </span>
                    )}
                    <span>.</span>
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <button
        className="fixed bottom-0 right-0 m-4 flex justify-center icon"
        onClick={() => setShowModal(true)}
      >
        <span className="material-symbols-outlined block">edit</span>
      </button>

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
