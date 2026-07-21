import { useEffect, useState } from "react";
import type { Prodi } from "../types/prodi";
import ProdiModal from "../components/prodi/ProdiModal";
import ProdiTable from "../components/prodi/ProdiTable";
import {
  createProdi,
  updateProdi,
  getProdi,
  deleteProdi,
} from "../service/prodiService";
import { toastSuccess, toastError, confirmDialog } from "../utils/alert";
import TableSkeleton from "../components/ui/TableSkeleton";
import { Link } from "react-router-dom";

export default function ProdiPage() {
  const [data, setData] = useState<Prodi[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<Prodi | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAdd = () => {
    setSelected(null);
    setOpenModal(true);
  };

  const handleEdit = (item: Prodi) => {
    setSelected(item);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    const result = await confirmDialog();
    if (result.isConfirmed) {
      await deleteProdi(id);
      await toastSuccess("Data deleted successfully");
      fetchProdi();
    }
  };

  const handleSave = async (form: any) => {
    try {
      if (selected) {
        await updateProdi(selected.id, form);
        await toastSuccess("Data updated successfully");
      } else {
        await createProdi({ ...form, status: true });
        await toastSuccess("Data added successfully");
      }

      fetchProdi();
      setOpenModal(false);
    } catch (err) {
      await toastError("An error occurred");
    }
  };

  useEffect(() => {
    fetchProdi();
  }, []);

  const fetchProdi = async () => {
    try {
      setLoading(true);

      const res = await getProdi();
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
          Study Program
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Study Program</h1>
          <p className="text-sm text-gray-500">Manage study program data</p>
        </div>

        <button
          onClick={handleAdd}
          className="px-5 py-3 rounded-xl bg-[#4647AE] hover:bg-[#3d3ea0] text-white"
        >
          Add Study Program
        </button>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <ProdiTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {openModal && (
        <ProdiModal
          prodi={selected}
          onClose={() => setOpenModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}