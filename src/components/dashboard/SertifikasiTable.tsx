import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";

import { useState } from "react";

interface Sertifikasi {
  id_sertifikasi: number;
  nama_sertifikasi: string;
  tanggal_sertifikasi: string;
  lembaga: string;
  level: string;
  status: string;

  prodi: {
    nama_prodi: string;
  };
}

export default function SertifikasiTable({
  data,
  onDetail,
}: {
  data: Sertifikasi[];
  onDetail: (row: Sertifikasi) => void;
}) {

  const [sorting, setSorting] = useState<any>([]);

  const columns: ColumnDef<Sertifikasi>[] = [
    {
      header: "Prodi",
      accessorFn: (row) => row.prodi.nama_prodi,
    },
    {
      header: "Sertifikasi",
      accessorKey: "nama_sertifikasi",
    },
    {
      header: "Tanggal",
      accessorKey: "tanggal_sertifikasi",
    },
    {
      header: "Lembaga",
      accessorKey: "lembaga",
    },
    {
      header: "Level",
      accessorKey: "level",
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium
          ${
            row.original.status === "Tersedia"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      header: "Aksi",
      cell: ({ row }) => (
        <button
          onClick={() => onDetail(row.original)}
          className="
            px-4 py-2 rounded-xl
            bg-[#4647AE]
            hover:bg-[#3d3ea0]
            text-white
            text-sm
            transition
          "
        >
          Detail
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
    },

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">
          Data Sertifikasi
        </h2>

        <p className="text-sm text-gray-500">
          Seluruh data sertifikasi mahasiswa
        </p>
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
                    onClick={header.column.getToggleSortingHandler()}
                    className="
                      px-5 py-4 text-left
                      font-semibold text-gray-600
                      cursor-pointer
                    "
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
                  <td
                    key={cell.id}
                    className="px-5 py-4 text-gray-700"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}

              </tr>
            ))}

          </tbody>
        </table>

      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between p-5 border-t border-gray-100">

        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="
            px-4 py-2 rounded-xl border
            hover:bg-gray-50
            disabled:opacity-50
          "
        >
          Previous
        </button>

        <span className="text-sm text-gray-500">
          Page {table.getState().pagination.pageIndex + 1}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="
            px-4 py-2 rounded-xl border
            hover:bg-gray-50
            disabled:opacity-50
          "
        >
          Next
        </button>

      </div>
    </div>
  );
}