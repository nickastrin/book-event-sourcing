import { useParams } from "react-router";
import { useGetById, useGetHistory } from "../features/books/queries";
import { BookService } from "../features/books/services";
import moment from "moment";

export const BooksActivityPage = () => {
  const service = new BookService();

  const { id } = useParams();
  const { data } = useGetById({ id: id!, service });

  const { data: history } = useGetHistory({
    id: id!,
    service,
  });

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
    </>
  );
};
