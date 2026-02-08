import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { useFilterContext } from "../contexts";
import moment from "moment";
import { DateInput } from "@src/components";

interface DateFilterProps {
  filterKey: string;
  label: string;
}

export const DateFilter = ({ filterKey, label }: DateFilterProps) => {
  const { queryFilters, onUpdateQueryFilters } = useFilterContext();

  const filter = queryFilters.filters?.[filterKey];

  const [startDate, setStartDate] = useState<Date | null>(
    filter ? moment(filter.value).toDate() : null,
  );

  return (
    <div onMouseDown={(e) => e.stopPropagation()}>
      <DateInput
        label={label}
        selected={startDate}
        onChange={(date: Date | null) => {
          setStartDate(date);
          const updatedFilters = { ...queryFilters.filters };
          if (date) {
            updatedFilters[filterKey] = {
              key: filterKey,
              value: moment(date).format("YYYY-MM-DD"),
            };
          } else {
            delete updatedFilters[filterKey];
          }

          onUpdateQueryFilters({
            filters: updatedFilters,
          });
        }}
      />
    </div>
  );
};
