import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BookService } from "../services";
import type { Book } from "../types";

type GetAllArgs = {
  params: URLSearchParams;
  service: BookService;
};

export const useGetAll = ({ params, service }: GetAllArgs) => {
  const { data: response, isFetching } = useQuery({
    queryKey: ["ALL_BOOKS", params],
    queryFn: ({ signal }) => service.getAll(params, signal),
  });

  const { items, totalCount } = response || { items: [], totalCount: 0 };
  return { items, totalCount, isFetching };
};

type GetByIdArgs = {
  id: string;
  service: BookService;
};

export const useGetById = ({ id, service }: GetByIdArgs) => {
  const { data, isFetching } = useQuery({
    queryKey: ["BOOK", id],
    queryFn: ({ signal }) => service.getById(id, signal),
  });

  return { data, isFetching };
};

type CreateArgs = {
  service: BookService;
};

type CreateMutationArgs = {
  data: Omit<Book, "id">;
};

export const useGetHistory = ({ id, service }: GetByIdArgs) => {
  const { data, isFetching } = useQuery({
    queryKey: ["BOOK", "BOOK_HISTORY", id],
    queryFn: ({ signal }) => service.getHistory(id, signal),
  });

  return { data, isFetching };
};

export const useCreate = ({ service }: CreateArgs) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createEntry, isPending } = useMutation({
    mutationFn: ({ data }: CreateMutationArgs) => service.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BOOKS"] });
    },
  });

  return { createEntry, isPending };
};

type UpdateArgs = {
  service: BookService;
};

type UpdateMutationArgs = {
  id: string;
  data: Book;
};

export const useUpdate = ({ service }: UpdateArgs) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateEntry, isPending } = useMutation({
    mutationFn: ({ id, data }: UpdateMutationArgs) => service.update(id, data),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["BOOK", id] });
      queryClient.invalidateQueries({ queryKey: ["BOOK", "BOOK_HISTORY", id] });
    },
  });

  return { updateEntry, isPending };
};

type DeleteArgs = {
  service: BookService;
};

type DeleteMutationArgs = {
  id: string;
};

export const useDelete = ({ service }: DeleteArgs) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteEntry, isPending } = useMutation({
    mutationFn: ({ id }: DeleteMutationArgs) => service.delete(id),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["BOOK", id] });
    },
  });

  return { deleteEntry, isPending };
};
