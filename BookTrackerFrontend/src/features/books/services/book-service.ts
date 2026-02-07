import { httpClient, type PaginatedResponse } from "../../../core";
import type { Book, BookHistory } from "../types";

export class BookService {
  private baseUrl = "/books";

  getAll = async (
    params: URLSearchParams,
    signal?: AbortSignal,
  ): Promise<PaginatedResponse<Book>> => {
    const queryPath = `${this.baseUrl}?${params.toString()}`;
    return await httpClient.get(queryPath, {
      signal,
    });
  };

  getById = async (id: string, signal?: AbortSignal): Promise<Book> => {
    const queryPath = `${this.baseUrl}/${id}`;
    return await httpClient.get(queryPath, { signal });
  };

  getHistory = async (
    id: string,
    signal?: AbortSignal,
  ): Promise<BookHistory> => {
    const queryPath = `${this.baseUrl}/${id}/history`;
    return await httpClient.get(queryPath, { signal });
  };

  create = async (book: Omit<Book, "id">): Promise<string> => {
    return await httpClient.post(this.baseUrl, book);
  };

  update = async (id: string, book: Omit<Book, "id">): Promise<string> => {
    const queryPath = `${this.baseUrl}/${id}`;
    return await httpClient.put(queryPath, book);
  };

  delete = async (id: string): Promise<string> => {
    const queryPath = `${this.baseUrl}/${id}`;
    return await httpClient.delete(queryPath);
  };
}
