import clsx from "clsx";
import { useGetHistory } from "../queries";
import type { BookService } from "../services";
import { extractEventDetails } from "../utils";
import moment from "moment";

interface BookTimelineProps {
  id: string;
  service: BookService;
}

export const BookTimeline = ({ id, service }: BookTimelineProps) => {
  const { data: history } = useGetHistory({
    id: id,
    service,
  });

  return (
    <div className="border rounded-xl max-w-[420px] overflow-hidden">
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
  );
};
