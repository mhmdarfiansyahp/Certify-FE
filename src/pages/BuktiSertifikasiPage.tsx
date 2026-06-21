import { useState } from "react";

type FileType = File | null;

type Mahasiswa = {
  id: number;
  nim: string;
  nama: string;
  file: FileType;
};

const initialData: Mahasiswa[] = [
  {
    id: 1,
    nim: "2211001",
    nama: "Budi Santoso",
    file: null,
  },
  {
    id: 2,
    nim: "2211002",
    nama: "Siti Rahma",
    file: null,
  },
  {
    id: 3,
    nim: "2211003",
    nama: "Andi Saputra",
    file: null,
  },
];

export default function BuktiSertifikasiPage() {
  const [data, setData] = useState<Mahasiswa[]>(initialData);

  const handleUpload = (id: number, file?: File) => {
    if (!file) return;

    // VALIDASI SIZE (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File maksimal 5MB");
      return;
    }

    // VALIDASI FORMAT
    const allowed = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowed.includes(file.type)) {
      alert("Format harus PDF / PNG / JPG");
      return;
    }

    setData((prev) =>
      prev.map((m) => (m.id === id ? { ...m, file } : m))
    );
  };

  const handleSave = () => {
    console.log("UPLOAD DATA:", data);
    alert("Data berhasil disimpan (dummy)");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Upload Bukti Sertifikasi
          </h1>
          <p className="text-sm text-gray-500">
            Upload dokumen PDF / JPG / PNG (maks 5MB)
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-[#4647AE] hover:bg-[#3d3ea0] text-white text-sm font-medium"
        >
          Simpan
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        {/* HEADER TABLE */}
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">
            Data Mahasiswa
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-5 py-3 text-left">No</th>
                <th className="px-5 py-3 text-left">NIM</th>
                <th className="px-5 py-3 text-left">Nama</th>
                <th className="px-5 py-3 text-left">File Bukti</th>
                <th className="px-5 py-3 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((mhs, index) => (
                <tr
                  key={mhs.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4">{index + 1}</td>
                  <td className="px-5 py-4">{mhs.nim}</td>
                  <td className="px-5 py-4">{mhs.nama}</td>

                  {/* STATUS FILE */}
                  <td className="px-5 py-4">
                    {mhs.file ? (
                      <span className="text-green-600 text-xs font-medium">
                        {mhs.file.name}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">
                        Belum upload
                      </span>
                    )}
                  </td>

                  {/* UPLOAD BUTTON */}
                  <td className="px-5 py-4">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) =>
                          handleUpload(mhs.id, e.target.files?.[0])
                        }
                      />

                      <span className="px-3 py-2 text-xs rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200">
                        {mhs.file ? "Replace File" : "Upload"}
                      </span>
                    </label>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-gray-400"
                  >
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