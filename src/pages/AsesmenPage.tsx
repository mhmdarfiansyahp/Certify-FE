import { useState } from "react";

type StatusAsesmen = "Kompeten" | "Tidak Kompeten" | "Tidak Hadir";

interface Mahasiswa {
  id: number;
  nim: string;
  nama: string;
  status: StatusAsesmen;
}

const initialData: Mahasiswa[] = [
  {
    id: 1,
    nim: "2211001",
    nama: "Budi Santoso",
    status: "Kompeten",
  },
  {
    id: 2,
    nim: "2211002",
    nama: "Siti Rahma",
    status: "Tidak Kompeten",
  },
  {
    id: 3,
    nim: "2211003",
    nama: "Andi Saputra",
    status: "Tidak Hadir",
  },
];

export default function AsesmenPage() {
  const [data, setData] = useState<Mahasiswa[]>(initialData);

  const [filter, setFilter] = useState({
    batch: "2026",
    kelas: "A",
  });

  const handleChangeStatus = (id: number, value: StatusAsesmen) => {
    setData((prev) =>
      prev.map((mhs) => (mhs.id === id ? { ...mhs, status: value } : mhs))
    );
  };

  const handleSave = () => {
    console.log("DATA ASESMEN:", data);
    alert("Data asesmen berhasil disimpan");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Asesmen Mahasiswa
          </h1>
          <p className="text-sm text-gray-500">
            Input hasil asesmen mahasiswa (Kompeten / Tidak Kompeten / Tidak
            Hadir)
          </p>
        </div>

        <button
          onClick={handleSave}
          className="
            px-4 py-2 rounded-lg
            bg-[#4647AE]
            hover:bg-[#3d3ea0]
            text-white text-sm font-medium
          "
        >
          Simpan Asesmen
        </button>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Batch */}
          <div>
            <label className="text-sm text-gray-600">Batch</label>
            <select
              className="w-full mt-1 p-2 border border-gray-400 rounded-lg focus:outline-none"
              value={filter.batch}
              onChange={(e) => setFilter({ ...filter, batch: e.target.value })}
            >
              <option value="2026">Batch 2026</option>
              <option value="2025">Batch 2025</option>
            </select>
          </div>

          {/* Kelas */}
          <div>
            <label className="text-sm text-gray-600">Kelas</label>
            <select
              className="w-full mt-1 p-2 border border-gray-400 rounded-lg focus:outline-none"
              value={filter.kelas}
              onChange={(e) => setFilter({ ...filter, kelas: e.target.value })}
            >
              <option value="A">Kelas A</option>
              <option value="B">Kelas B</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE CARD (STYLE SAMA CRUD ADMIN) */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        {/* TABLE HEADER */}
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Data Mahasiswa</h2>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-5 py-3 text-left">No</th>
                <th className="px-5 py-3 text-left">NIM</th>
                <th className="px-5 py-3 text-left">Nama</th>
                <th className="px-5 py-3 text-left">Hasil Asesmen</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((mhs, index) => (
                  <tr key={mhs.id} className=" hover:bg-gray-50 transition">
                    <td className="px-5 py-4">{index + 1}</td>
                    <td className="px-5 py-4">{mhs.nim}</td>
                    <td className="px-5 py-4">{mhs.nama}</td>

                    <td className="px-5 py-4 w-72">
                      <select
                        value={mhs.status}
                        onChange={(e) =>
                          handleChangeStatus(
                            mhs.id,
                            e.target.value as StatusAsesmen
                          )
                        }
                        className="
                          w-full
                          border
                          border-gray-400
                          rounded-lg
                          px-3 py-2
                          focus:outline-none
                        "
                      >
                        <option value="Kompeten">Kompeten</option>
                        <option value="Tidak Kompeten">Tidak Kompeten</option>
                        <option value="Tidak Hadir">Tidak Hadir</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400">
                    Tidak ada data mahasiswa
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
