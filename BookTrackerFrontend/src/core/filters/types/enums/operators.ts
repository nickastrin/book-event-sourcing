export const LogicalOperator = {
  AND: ",",
  OR: "|",
} as const;

export type LogicalOperator =
  (typeof LogicalOperator)[keyof typeof LogicalOperator];

export const ComparisonOperator = {
  EQUALS: "=",
  NOT_EQUALS: "!=",
  GREATER_THAN: ">",
  LESS_THAN: "<",
  GREATER_THAN_OR_EQUALS: ">=",
  LESS_THAN_OR_EQUALS: "<=",
  CONTAINS: "*=",
} as const;

export type ComparisonOperator =
  (typeof ComparisonOperator)[keyof typeof ComparisonOperator];
