export interface Book {
  id: string;
  title: string;
  description?: string;

  authors: string[];
  publishDate: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
