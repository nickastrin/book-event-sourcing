import { useParams } from "react-router";
import {
  useGetById,
  useGetHistory,
  useUpdate,
} from "../features/books/queries";
import { BookService } from "../features/books/services";
import moment from "moment";
import { useState } from "react";
import { BooksUpsertModal } from "@src/features/books";

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
    <>
      <div className="border rounded-xl p-4">
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
        <p>{moment(data?.publishDate).format("MMMM Do, YYYY")}</p>
        <p>{data?.authors.join(", ")}</p>
      </div>

      <div className="border rounded-xl p-4">
        {history?.map((audit, i) => {
          return (
            <div key={i} className="border rounded-md p-2 mb-2">
              <p>{audit.type}</p>
              <p>{audit.details.change}</p>
              <p>
                {moment(audit.modifiedAt).format("MMMM Do, YYYY, h:mm:ss a")}
              </p>
            </div>
          );
        })}
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
    </>
  );
};
