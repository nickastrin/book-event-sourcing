export const BookEvent = {
  BOOK_ADDED: "BookAdded",
  TITLE_CHANGED: "TitleChanged",
  DESCRIPTION_CHANGED: "DescriptionChanged",
  AUTHOR_ADDED: "AuthorAdded",
  AUTHOR_REMOVED: "AuthorRemoved",
  PUBLISH_DATE_CHANGED: "PublishDateChanged",
} as const;

export type BookEventType = (typeof BookEvent)[keyof typeof BookEvent];
