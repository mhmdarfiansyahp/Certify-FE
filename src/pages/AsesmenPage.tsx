import { useEffect, useState } from "react";

import {
  getMahasiswaAsesmen,
  saveBulkAsesmen,
} from "../service/asesmenService";

import type {
  StatusAsesmen,
  MahasiswaAsesmen,
} from "../types/asesmen";

import { toastSuccess, toastError } from "../utils/alert";
import TableSkeleton from "../components/ui/TableSkeleton";

export default function AsesmenPage() {
  const [data, setData] = useState<MahasiswaAsesmen[]>([]);
  const [sertifikasi, setSertifikasi] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState({
    batch: "2026",
    kelas: "A",
  });

  const sertifikasiId = 1;

  const fetchData = async () => {
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
    fetchData();
  }, []);

  const handleChangeStatus = (
    id: number,
    value: StatusAsesmen
  ) => {
    setData((prev) =>
      prev.map((mhs) =>
        mhs.id === id
          ? { ...mhs, status: value }
          : mhs
      )
    );
  };

  const handleSave = async () => {
    try {
      const payload = {
        sertifikasi_id: sertifikasi?.id,
        tanggal_asesmen: new Date().toISOString().split("T")[0],
        asesmens: data.map((mhs) => ({
          user_id: mhs.id,
          status_kompetensi: mhs.status,
          catatan: null,
        })),
      };

      await saveBulkAsesmen(payload);

      await toastSuccess("Asesmen berhasil disimpan");
    } catch (error) {
      console.error(error);
      await toastError("Gagal menyimpan asesmen");
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
            Input hasil asesmen mahasiswa
          </p>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Batch */}
          <div>
            <label className="text-sm text-gray-600">Batch</label>
            <select
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              value={filter.batch}
              onChange={(e) =>
                setFilter({ ...filter, batch: e.target.value })
              }
            >
              <option value="2026">Batch 2026</option>
              <option value="2025">Batch 2025</option>
            </select>
          </div>

          {/* Kelas */}
          <div>
            <label className="text-sm text-gray-600">Kelas</label>
            <select
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              value={filter.kelas}
              onChange={(e) =>
                setFilter({ ...filter, kelas: e.target.value })
              }
            >
              <option value="A">Kelas A</option>
              <option value="B">Kelas B</option>
            </select>
          </div>

        </div>
      </div>

      {/* INFO SERTIFIKASI */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <p className="text-sm text-gray-500">Sertifikasi</p>
            <h2 className="text-xl font-bold text-gray-800">
              {sertifikasi?.nama_sertifikasi}
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">Lembaga</p>
            <h2 className="text-lg font-semibold text-gray-700">
              {sertifikasi?.lembaga}
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">Level</p>
            <p className="text-gray-700">
              {sertifikasi?.level}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Batch / Kelas</p>
            <p className="text-gray-700">
              Batch {filter.batch} - Kelas {filter.kelas}
            </p>
          </div>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">

        {/* TABLE HEADER */}
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

        {/* TABLE BODY */}
        {loading ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-5 py-3 text-left w-16">No</th>
                  <th className="px-5 py-3 text-left">NIM</th>
                  <th className="px-5 py-3 text-left">Nama Mahasiswa</th>
                  <th className="px-5 py-3 text-left w-80">Hasil Asesmen</th>
                </tr>
              </thead>

              <tbody>
                {data.length > 0 ? (
                  data.map((mhs, index) => (
                    <tr
                      key={mhs.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">{index + 1}</td>

                      <td className="px-5 py-4 font-medium text-gray-700">
                        {mhs.nim}
                      </td>

                      <td className="px-5 py-4">{mhs.nama}</td>

                      <td className="px-5 py-4">
                        <select
                          value={mhs.status}
                          onChange={(e) =>
                            handleChangeStatus(
                              mhs.id,
                              e.target.value as StatusAsesmen
                            )
                          }
                          className={`w-full rounded-xl px-3 py-2.5 border focus:outline-none transition`}
                        >
                          <option value="">Pilih Hasil</option>
                          <option value="Kompeten">Kompeten</option>
                          <option value="Tidak Kompeten">
                            Tidak Kompeten
                          </option>
                          <option value="Tidak Hadir">
                            Tidak Hadir
                          </option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-12 text-gray-400"
                    >
                      Tidak ada data mahasiswa
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}