import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { GridPagination } from "./GridPagination";

interface GridProps<T extends { id: string }> {
  data: T[];
  totalCount: number;
  columns: ColumnDef<T>[];
}

export function Grid<T extends { id: string }>({
  data,
  totalCount,
  columns,
}: GridProps<T>) {
  const navigate = useNavigate();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      <div
        className={clsx(
          "size-full bg-zinc-900",
          "overflow-y-auto border-gray-300",
        )}
      >
        <table className="size-full table-fixed border-collapse">
          <thead className="sticky top-0 z-10 bg-zinc-900 border-b">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th className="px-3 py-5 text-left" key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={clsx(
                  "cursor-pointer even:bg-zinc-800/30 hover:bg-indigo-500/10",
                )}
                onClick={() => navigate(row.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td className="p-3 text-left truncate" key={cell.id}>
                    {!cell?.getValue()
                      ? "-"
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky bottom-0 z-10 bg-zinc-900 border-t">
            <tr>
              <td className="p-3 text-left" colSpan={columns.length}>
                <GridPagination totalCount={totalCount} />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
