export interface Book {
  id: string;
  title: string;
  description?: string;

  authors: string[];
  publishDate?: string;

  createdAt?: Date;
  lastUpdatedAt?: Date;
}
