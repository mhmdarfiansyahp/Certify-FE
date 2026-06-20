import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "../../types/User";

import { FaEdit, FaTrash } from "react-icons/fa";

export default function UserTable({
  data,
  onEdit,
  onDelete,
}: {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}) {

  const columns: ColumnDef<User>[] = [
    {
      header: "Nama",
      accessorKey: "name",
    },
    {
      header: "Username",
      accessorKey: "username",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      cell: ({ row }) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
          {row.original.role}
        </span>
      ),
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium
          ${row.original.status
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
          }`}
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
            className="w-9 h-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(row.original.id)}
            className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center"
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
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">

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
            <tr key={row.id} className="border-t hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-5 py-4 text-gray-700">
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
  );
}