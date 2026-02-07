import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useFilterContext } from "../contexts";
import moment from "moment";

interface DateFilterProps {
  filterKey: string;
}

export const DateFilter = ({ filterKey }: DateFilterProps) => {
  const { queryFilters, onUpdateQueryFilters } = useFilterContext();

  const filter = queryFilters.filters?.[filterKey];

  const [startDate, setStartDate] = useState<Date | null>(
    filter ? moment(filter.value).toDate() : null,
  );

  return (
    <DatePicker
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
  );
};
