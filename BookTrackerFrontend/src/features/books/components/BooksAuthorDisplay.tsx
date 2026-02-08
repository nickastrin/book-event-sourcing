import { useWatch } from "react-hook-form";
import clsx from "clsx";

export const BooksAuthorDisplay = () => {
  const selectedAuthors: string[] = useWatch({
    name: "authors",
    defaultValue: [],
  });

  return (
    <div className="flex flex-row items-center gap-2 flex-wrap">
      {selectedAuthors?.map((author) => (
        <div
          key={author}
          className={clsx(
            "border border-indigo-50 bg-indigo-500/10",
            "text-indigo-50 text-xs px-2 py-1 rounded",
          )}
        >
          <span>{author}</span>
        </div>
      ))}
    </div>
  );
};
