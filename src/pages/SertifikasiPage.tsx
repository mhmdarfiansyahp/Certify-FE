import { useEffect, useState } from "react";
import SertifikasiTable from "../components/sertifikasi/SertifikasiTable";
import SertifikasiModal from "../components/sertifikasi/SertifikasiModal";

import {
  getSertifikasi,
  createSertifikasi,
  updateSertifikasi,
  deleteSertifikasi,
} from "../service/sertifikasiService";

import { toastSuccess, toastError, confirmDialog } from "../utils/alert";

import type { Sertifikasi } from "../types/sertifikasi";
import TableSkeleton from "../components/ui/TableSkeleton";
import { Link } from "react-router-dom";

export default function SertifikasiPage() {
  const [data, setData] = useState<Sertifikasi[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<Sertifikasi | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getSertifikasi();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setOpenModal(true);
  };

  const handleEdit = (item: Sertifikasi) => {
    setSelected(item);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    const result = await confirmDialog();

    if (result.isConfirmed) {
      try {
        await deleteSertifikasi(id);
        await toastSuccess("Data berhasil dihapus");
        fetchData();
      } catch (err) {
        await toastError("Gagal menghapus");
      }
    }
  };

  const handleSave = async (form: any) => {
    try {
      if (selected) {
        await updateSertifikasi(selected.id, form);
        await toastSuccess("Data berhasil diupdate");
      } else {
        await createSertifikasi(form);
        await toastSuccess("Data berhasil ditambahkan");
      }

      fetchData();
      setOpenModal(false);
    } catch (err) {
      await toastError("Terjadi kesalahan");
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
          Sertifikasi
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sertifikasi</h1>
          <p className="text-sm text-gray-500">
            Kelola data sertifikasi mahasiswa
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-5 py-3 rounded-xl bg-[#4647AE] text-white hover:bg-[#3d3ea0]"
        >
          Tambah Sertifikasi
        </button>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <SertifikasiTable
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {openModal && (
        <SertifikasiModal
          sertifikasi={selected}
          onClose={() => setOpenModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
