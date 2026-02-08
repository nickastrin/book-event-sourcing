import type { Filter } from "./filter";

export interface QueryFilter {
  search?: string;
  filters?: Record<string, Filter>;
  pagination?: {
    page: number;
    pageSize: number;
  };
  orderBy?: string;
}
