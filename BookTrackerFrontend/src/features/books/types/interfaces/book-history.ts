import type { BookEventType } from "../enums";

export interface BookModification {
  type: BookEventType;
  details: {
    change: string;
  };
  modifiedAt: Date;
}

export type BookHistory = BookModification[];
