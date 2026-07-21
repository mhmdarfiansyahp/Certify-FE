import { useEffect, useState } from "react";

import UserTable from "../components/users/UserTable";
import UserModal from "../components/users/UserModal";
import TableSkeleton from "../components/ui/TableSkeleton";

import type { User } from "../types/user";

import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../service/userService";

import { toastSuccess, toastError, confirmDialog } from "../utils/alert";
import { Link } from "react-router-dom";

export default function UserPage() {
  const [data, setData] = useState<User[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAdd = () => {
    setSelected(null);
    setOpenModal(true);
  };

  const handleEdit = (user: User) => {
    setSelected(user);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    const result = await confirmDialog();

    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        await toastSuccess("User deleted successfully");
        fetchUsers();
      } catch (err) {
        await toastError("Failed to delete user");
      }
    }
  };

  const handleSave = async (form: any) => {
    try {
      if (selected) {
        await updateUser(selected.id, form);
        await toastSuccess("User updated successfully");
      } else {
        await createUser({ ...form, status: true });
        await toastSuccess("User added successfully");
      }

      fetchUsers();
      setOpenModal(false);
    } catch (err) {
      await toastError("An error occurred");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUser();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <Link
          to="/dashboard"
          className="hover:text-[#4647AE] transition">
          Dashboard
        </Link>
        <span className="text-black">{">"}</span>
        <span className="font-medium text-[#4647AE]">
          User
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500">Manage system user data</p>
        </div>

        <button
          onClick={handleAdd}
          className="px-5 py-3 rounded-xl bg-[#4647AE] hover:bg-[#3d3ea0] text-white"
        >
          Add User
        </button>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <UserTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {openModal && (
        <UserModal
          user={selected}
          onClose={() => setOpenModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}