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
      await toastSuccess("Data berhasil dihapus");
      fetchProdi();
    }
  };

  const handleSave = async (form: any) => {
    try {
      if (selected) {
        await updateProdi(selected.id, form);
        await toastSuccess("Data berhasil diupdate");
      } else {
        await createProdi({ ...form, status: true });
        await toastSuccess("Data berhasil ditambahkan");
      }

      fetchProdi();
      setOpenModal(false);
    } catch (err) {
      await toastError("Terjadi kesalahan");
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
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Program Studi</h1>
          <p className="text-sm text-gray-500">Kelola data prodi</p>
        </div>

        <button
          onClick={handleAdd}
          className="px-5 py-3 rounded-xl bg-[#4647AE] hover:bg-[#3d3ea0] text-white"
        >
          Tambah Program Studi
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
