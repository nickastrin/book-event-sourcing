import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useNavigate } from "react-router";

interface GridProps<T extends { id: string }> {
  data: T[];
  totalCount: number;
  columns: ColumnDef<T>[];
}

export function Grid<T extends { id: string }>({
  data,
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
    <div className="border rounded-lg size-full border-gray-300">
      <table className="size-full table-fixed border-collapse">
        <thead className="border-b">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th className="px-3 py-4 text-left" key={header.id}>
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
                    : flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
