import type { ComparisonOperator } from "../enums/operators";

export interface Filter {
  key: string;
  operator: ComparisonOperator;
  value: unknown;
}
