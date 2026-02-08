import { Dropdown } from "@src/components";
import { AUTHORS } from "@src/features/authors";
import { useFormContext } from "react-hook-form";

export const BooksAuthorDropdown = () => {
  const { register } = useFormContext();

  return (
    <Dropdown
      label={
        <div className="flex gap-1 items-center">
          <span className="text-sm font-bold">Authors</span>
          <span className="material-symbols-outlined">add</span>
        </div>
      }
    >
      {AUTHORS.map((author) => (
        <div key={author}>
          <label className="flex items-center gap-2 p-2 w-full cursor-pointer">
            <input
              type="checkbox"
              value={author}
              className="accent-indigo-400"
              {...register("authors")}
            />
            <span className="truncate text-white">{author}</span>
          </label>
        </div>
      ))}
    </Dropdown>
  );
};
