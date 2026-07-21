import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import type { Prodi } from "../../types/prodi";
import { cn } from "../../utils/utils";

export default function ProdiTable({
  data,
  onEdit,
  onDelete,
}: {
  data: Prodi[];
  onEdit: (item: Prodi) => void;
  onDelete: (id: number) => void;
}) {
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<Prodi>[] = [
    {
      header: "No",
      cell: ({ row }) => <span className="text-gray-500">{row.index + 1}</span>,
    },
    {
      header: "Study Program Name",
      accessorKey: "nama_prodi",
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <span
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            row.original.status
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          )}
        >
          {row.original.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(row.original)}
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center transition",
              "bg-amber-100 text-amber-600 hover:bg-amber-200"
            )}
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(row.original.id)}
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center transition",
              "bg-red-100 text-red-600 hover:bg-red-200"
            )}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search Study Program..."
            className={cn(
              "w-full pl-10 pr-4 py-2.5 border border-gray-200",
              "rounded-xl text-sm focus:outline-none"
            )}
          />
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-5 py-4 text-left font-semibold text-gray-600"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-4 text-gray-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-gray-400"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Total: {table.getFilteredRowModel().rows.length}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={cn(
              "w-9 h-9 rounded-lg border flex items-center justify-center",
              "hover:bg-gray-50 transition",
              !table.getCanPreviousPage() && "opacity-40"
            )}
          >
            <FaChevronLeft size={12} />
          </button>

          <span className="text-sm">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={cn(
              "w-9 h-9 rounded-lg border flex items-center justify-center",
              "hover:bg-gray-50 transition",
              !table.getCanNextPage() && "opacity-40"
            )}
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}