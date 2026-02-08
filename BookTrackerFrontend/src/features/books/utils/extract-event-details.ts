import { BookEvent, type BookModification } from "../types";

export const extractEventDetails = (event: BookModification) => {
  switch (event.type) {
    case BookEvent["BOOK_ADDED"]:
      return {
        title: "Book Added",
        message: "Book was added to the collection:",
        change: event.details.change,
      };
    case BookEvent["TITLE_CHANGED"]:
      return {
        title: "Title Changed",
        message: "Book title was changed to",
        change: event.details.change,
      };
    case BookEvent["DESCRIPTION_CHANGED"]:
      return {
        title: "Description Changed",
        message: "Book description was changed to",
        change: event.details.change,
      };
    case BookEvent["AUTHOR_ADDED"]:
      return {
        title: "Author Added",
        message: "Author was added to the book",
        change: event.details.change,
      };
    case BookEvent["AUTHOR_REMOVED"]:
      return {
        title: "Author Removed",
        message: "Author was removed from the book",
        change: event.details.change,
      };
    case BookEvent["PUBLISH_DATE_CHANGED"]:
      return {
        title: "Publish Date Changed",
        message: "Book publish date was changed to",
        change: event.details.change,
      };
    default:
      return {
        title: "Unknown Event",
        message: "An unknown event occurred",
        change: null,
      };
  }
};
