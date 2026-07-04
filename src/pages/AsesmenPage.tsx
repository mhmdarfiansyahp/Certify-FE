import { useEffect, useState } from "react";
import { getSertifikasiProdi } from "../service/sertifikasiService";

import {
  getMahasiswaAsesmen,
  saveBulkAsesmen,
} from "../service/asesmenService";

import type { StatusAsesmen, MahasiswaAsesmen } from "../types/asesmen";

import { toastSuccess, toastError } from "../utils/alert";
import TableSkeleton from "../components/ui/TableSkeleton";
import AsesmenTable from "../components/asesmen/AsesmenTable";

type FileMap = {
  [key: number]: File | null;
};

export default function AsesmenPage() {
  const [data, setData] = useState<MahasiswaAsesmen[]>([]);
  const [sertifikasi, setSertifikasi] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [sertifikasiList, setSertifikasiList] = useState<any[]>([]);
  const [sertifikasiId, setSertifikasiId] = useState<number | null>(null);
  const [files, setFiles] = useState<FileMap>({});

  const fetchData = async () => {
    if (!sertifikasiId) return;

    try {
      setLoading(true);

      const result = await getMahasiswaAsesmen(sertifikasiId);

      setSertifikasi(result.sertifikasi);
      setData(result.data);
    } catch (error) {
      console.error(error);
      await toastError("Gagal mengambil data mahasiswa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSertifikasi();
  }, []);

  useEffect(() => {
    fetchData();
  }, [sertifikasiId]);

  const fetchSertifikasi = async () => {
    try {
      const result = await getSertifikasiProdi();

      setSertifikasiList(result.data);

      if (result.data.length > 0) {
        setSertifikasiId(result.data[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // CHANGE STATUS
  const handleChangeStatus = (id: number, value: StatusAsesmen) => {
    setData((prev) =>
      prev.map((mhs) =>
        mhs.id === id ? { ...mhs, status: value } : mhs
      )
    );
  };

  // UPLOAD FILE
  const handleUpload = (id: number, file?: File) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toastError("File maksimal 5MB");
      return;
    }

    const allowed = [
      "application/pdf",
      "image/png",
      "image/jpeg",
    ];

    if (!allowed.includes(file.type)) {
      toastError("Format harus PDF / PNG / JPG");
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [id]: file,
    }));
  };

  // SAVE
  const handleSave = async () => {
    try {
      for (const mhs of data) {
        if (mhs.status === "Kompeten" && !files[mhs.id]) {
          return toastError(`Bukti sertifikasi untuk ${mhs.nama} wajib diupload`);
        }
      }

      const formData = new FormData();
      formData.append("sertifikasi_id", String(sertifikasi?.id));
      formData.append("tanggal_asesmen", new Date().toISOString().split("T")[0]);
      data.forEach((mhs, index) => {
        formData.append(`asesmens[${index}][user_id]`, String(mhs.id));
        formData.append(`asesmens[${index}][status_kompetensi]`, mhs.status || "");
        formData.append(`asesmens[${index}][catatan]`, "");
        if (files[mhs.id]) {
          formData.append(`asesmens[${index}][bukti_pendukung]`, files[mhs.id] as File);
        }
      });

      await saveBulkAsesmen(formData);

      await fetchData();

      toastSuccess("Asesmen berhasil disimpan");
    } catch (error) {
      console.error(error);
      toastError("Gagal menyimpan asesmen");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Asesmen Mahasiswa
          </h1>

          <p className="text-sm text-gray-500">
            Input hasil asesmen & upload bukti sertifikasi
          </p>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
        <div>
          <label className="text-sm text-gray-600">
            Sertifikasi
          </label>

          <select
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
            value={sertifikasiId ?? ""}
            onChange={(e) =>
              setSertifikasiId(Number(e.target.value))
            }
          >
            {sertifikasiList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama_sertifikasi}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* INFO */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-gray-500">
              Sertifikasi
            </p>

            <h2 className="text-xl font-bold text-gray-800">
              {sertifikasi?.nama_sertifikasi}
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Lembaga
            </p>

            <h2 className="text-lg font-semibold text-gray-700">
              {sertifikasi?.lembaga}
            </h2>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        {/* HEADER */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">
              Data Mahasiswa
            </h2>

            <p className="text-sm text-gray-500">
              Total {data.length} mahasiswa
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-[#4647AE] text-white hover:bg-[#3d3ea0]"
          >
            Simpan Asesmen
          </button>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : (
          <AsesmenTable
            data={data}
            files={files}
            onChangeStatus={handleChangeStatus}
            onUpload={handleUpload}
          />
        )}
      </div>
    </div>
  );
}
