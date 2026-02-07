import type { Filter } from "./filter";

export interface QueryFilter {
  search?: string;
  filters?: Filter[];
  pagination?: {
    page: number;
    pageSize: number;
  };
  orderBy?: string;
}
