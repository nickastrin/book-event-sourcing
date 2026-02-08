import type { Book } from "../types";
import { DateInput, Input, Modal } from "@src/components";
import { Controller, FormProvider, useForm } from "react-hook-form";
import moment from "moment";
import clsx from "clsx";
import { BooksAuthorDropdown } from "./BooksAuthorDropdown";
import { BooksAuthorDisplay } from "./BooksAuthorDisplay";

interface BooksUpsertModalProps {
  initialValues?: Book;
  show: boolean;
  onClose: () => void;
  onSubmit: (data: Book) => Promise<string>;
}

export const BooksUpsertModal = ({
  initialValues,
  show,
  onClose,
  onSubmit,
}: BooksUpsertModalProps) => {
  const methods = useForm<Book>({
    defaultValues: initialValues || {
      title: "",
      description: "",
      authors: [],
    },
  });

  const modalHeader = initialValues ? "Edit Book" : "Add New Book";

  return (
    <>
      <Modal header={modalHeader} show={show} onClose={onClose}>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col h-full min-h-0"
          >
            <div
              className={clsx(
                "flex-1 overflow-y-auto p-4",
                "flex flex-col gap-4 min-h-0",
              )}
            >
              <Input
                {...methods.register("title", { required: true })}
                type="text"
                label="Title"
                placeholder="Title"
                isRequired
              />

              <Input
                {...methods.register("description")}
                type="text"
                label="Description"
                placeholder="Description"
              />

              <Controller
                control={methods.control}
                name="publishDate"
                render={({ field }) => (
                  <DateInput
                    selected={
                      field.value
                        ? moment(field.value, "YYYY-MM-DD").toDate()
                        : null
                    }
                    onChange={(date: Date | null) => {
                      field.onChange(
                        date ? moment(date).format("YYYY-MM-DD") : null,
                      );
                    }}
                    label="Publish Date"
                    placeholder="Select a date"
                    isClearable
                  />
                )}
              />

              <BooksAuthorDropdown />
              <BooksAuthorDisplay />
            </div>
            <div className="flex-none p-4 border-t bg-zinc-700">
              <button type="submit" className="w-full">
                Submit
              </button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
