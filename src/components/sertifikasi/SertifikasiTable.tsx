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

import { cn } from "../../utils/utils";
import type { Sertifikasi } from "../../types/sertifikasi";

export default function SertifikasiTable({
  data,
  onEdit,
  onDelete,
}: {
  data: Sertifikasi[];
  onEdit: (item: Sertifikasi) => void;
  onDelete: (id: number) => void;
}) {
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<Sertifikasi>[] = [
    {
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Program Studi",
      cell: ({ row }) => row.original.prodi?.nama_prodi || "-",
    },
    {
      header: "Nama Sertifikasi",
      accessorKey: "nama_sertifikasi",
    },
    {
      header: "Lembaga",
      accessorKey: "lembaga",
    },
    {
      header: "Level",
      cell: ({ row }) => (
        <span
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            row.original.level === "Internasional"
              ? "bg-indigo-100 text-indigo-700"
              : "bg-amber-100 text-amber-700"
          )}
        >
          {row.original.level}
        </span>
      ),
    },
    {
      header: "Kode Sertifikasi",
      accessorKey: "scheme_code"
    },
    {
      header: "Tanggal Sertifikasi",
      accessorKey: "tanggal_sertifikasi",
      cell: ({ row }) => {
        const date = new Date(row.original.tanggal_sertifikasi);

        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
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
          {row.original.status ? "Aktif" : "Nonaktif"}
        </span>
      ),
    },
    {
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(row.original)}
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center",
              "bg-amber-100 text-amber-600 hover:bg-amber-200 transition"
            )}
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(row.original.id)}
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center",
              "bg-red-100 text-red-600 hover:bg-red-200 transition"
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
      {/* SEARCH */}
      <div className="p-5 border-b border-gray-100 flex justify-between">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Cari sertifikasi..."
            className={cn(
              "w-full pl-10 pr-4 py-2.5 border border-gray-200",
              "rounded-xl text-sm focus:outline-none"
            )}
          />
        </div>
      </div>

      {/* TABLE */}
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
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-4 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Total: {table.getFilteredRowModel().rows.length}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="w-9 h-9 rounded-lg border flex items-center justify-center"
          >
            <FaChevronLeft size={12} />
          </button>

          <span className="text-sm">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="w-9 h-9 rounded-lg border flex items-center justify-center"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
