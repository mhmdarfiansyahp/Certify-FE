import { useState } from "react";
import UserTable from "../components/users/UserTable";
import UserModal from "../components/users/UserModal";
import type { User } from "../types/User";

export default function UserPage() {

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Admin Utama",
      username: "admin",
      email: "admin@gmail.com",
      role: "admin",
      status: true,
      prodi_id: null,
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);

  // OPEN ADD
  const handleAdd = () => {
    setSelected(null);
    setOpenModal(true);
  };

  // OPEN EDIT
  const handleEdit = (user: User) => {
    setSelected(user);
    setOpenModal(true);
  };

  // DELETE
  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // SAVE (CREATE / UPDATE)
  const handleSave = (form: any) => {

    if (selected) {
      // UPDATE
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selected.id ? { ...u, ...form } : u
        )
      );
    } else {
      // CREATE
      const newUser: User = {
        id: Date.now(),
        ...form,
      };

      setUsers((prev) => [...prev, newUser]);
    }

    setOpenModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen User
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            CRUD data pengguna sistem
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="
            px-5 py-3 rounded-xl
            bg-[#4647AE]
            hover:bg-[#3d3ea0]
            text-white
          "
        >
          Tambah User
        </button>

      </div>

      {/* TABLE */}
      <UserTable
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* MODAL */}
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