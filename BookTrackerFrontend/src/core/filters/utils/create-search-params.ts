import type { QueryFilter } from "../types";

export const createSearchParams = (queryFilters: QueryFilter) => {
  const { search, filters, pagination, orderBy } = queryFilters;

  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }
  if (pagination) {
    params.append("page", pagination.page.toString());
    params.append("pageSize", pagination.pageSize.toString());
  }
  if (orderBy) {
    params.append("orderBy", orderBy);
  }

  Object.values(filters || {}).forEach((filter) => {
    if (!filter.value) {
      return;
    }

    if (Array.isArray(filter.value)) {
      filter.value.forEach((val) => {
        params.append(filter.key, val);
      });
    } else {
      params.append(filter.key, filter.value);
    }
  });

  return params.toString();
};
