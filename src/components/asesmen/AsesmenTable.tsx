import type {
    MahasiswaAsesmen,
    StatusAsesmen,
} from "../../types/asesmen";

import {
    FiUpload,
    FiFileText,
    FiEye,
    FiDownload,
    FiRefreshCw,
} from "react-icons/fi";

type FileMap = {
    [key: number]: File | null;
};

interface Props {
    data: MahasiswaAsesmen[];
    files: FileMap;
    onChangeStatus: (
        id: number,
        value: StatusAsesmen
    ) => void;
    onUpload: (id: number, file?: File) => void;
}

export default function AsesmenTable({
    data,
    files,
    onChangeStatus,
    onUpload,
}: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-275 w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                    <tr>
                        <th className="px-5 py-3 text-left">No</th>
                        <th className="px-5 py-3 text-left">NIM</th>
                        <th className="px-5 py-3 text-left">Nama</th>
                        <th className="px-5 py-3 text-left w-72">Hasil Asesmen</th>
                        <th className="px-5 py-3 text-left min-w-[320px]">Bukti Sertifikasi</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length > 0 ? (
                        data.map((mhs, index) => {
                            const file = files[mhs.id];

                            const previewUrl = file
                                ? URL.createObjectURL(file)
                                : "";

                            // 1. MODIFIKASI DISINI: Tentukan kondisi kapan baris ini harus disable.
                            // Jika mhs.status sudah ada isinya (Kompeten / Tidak Kompeten / Tidak Hadir), maka dikunci.
                            const isRowDisabled = mhs.status !== "" && mhs.status !== undefined && mhs.status !== null;

                            return (
                                <tr
                                    key={mhs.id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                                >
                                    {/* NO */}
                                    <td className="px-5 py-4">{index + 1}</td>

                                    {/* NIM */}
                                    <td className="px-5 py-4 font-medium text-gray-700">{mhs.nim}</td>

                                    {/* NAMA */}
                                    <td className="px-5 py-4">{mhs.nama}</td>

                                    {/* STATUS */}
                                    <td className="px-5 py-4">
                                        <select
                                            value={mhs.status || ""}
                                            disabled={isRowDisabled} // 2. Tambahkan properti disabled disini
                                            onChange={(e) =>
                                                onChangeStatus(
                                                    mhs.id,
                                                    e.target.value as StatusAsesmen
                                                )
                                            }
                                            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                                        >
                                            <option value="">Pilih Hasil</option>
                                            <option value="Kompeten">Kompeten</option>
                                            <option value="Tidak Kompeten">Tidak Kompeten</option>
                                            <option value="Tidak Hadir">Tidak Hadir</option>
                                        </select>
                                    </td>

                                    {/* FILE */}
                                    <td className="px-5 py-4">
                                        {file ? (
                                            <div className="border border-gray-200 rounded-xl p-3 bg-gray-50">
                                                <div className="flex items-center gap-3">
                                                    {file.type.startsWith("image") ? (
                                                        <img
                                                            src={previewUrl}
                                                            alt="preview"
                                                            className="w-12 h-12 rounded-lg object-cover border"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                                                            <FiFileText size={20} className="text-red-600" />
                                                        </div>
                                                    )}

                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-700 truncate">
                                                            {file.name}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-gray-500">
                                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                                            </span>
                                                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                                                Uploaded
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 mt-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => window.open(previewUrl)}
                                                        className="p-2 rounded-lg border bg-white hover:bg-gray-100 transition"
                                                        title="Preview"
                                                    >
                                                        <FiEye size={14} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const a = document.createElement("a");
                                                            a.href = previewUrl;
                                                            a.download = file.name;
                                                            a.click();
                                                        }}
                                                        className="p-2 rounded-lg border bg-white hover:bg-gray-100 transition"
                                                        title="Download"
                                                    >
                                                        <FiDownload size={14} />
                                                    </button>

                                                    {/* 3. Sembunyikan atau nonaktifkan tombol Replace File jika status sudah terkunci */}
                                                    {!isRowDisabled && (
                                                        <label
                                                            className="cursor-pointer p-2 rounded-lg border bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                                                            title="Replace File"
                                                        >
                                                            <input
                                                                type="file"
                                                                accept=".pdf,.png,.jpg,.jpeg"
                                                                className="hidden"
                                                                onChange={(e) =>
                                                                    onUpload(
                                                                        mhs.id,
                                                                        e.target.files?.[0]
                                                                    )
                                                                }
                                                            />
                                                            <FiRefreshCw size={14} />
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            /* 4. Modifikasi bagian Upload area saat kosong */
                                            isRowDisabled ? (
                                                // Jika status sudah dipilih ("Tidak Kompeten" / "Tidak Hadir") dan file kosong, tampilkan placeholder disabled saja tanpa aksi upload
                                                <div className="border-2 border-dashed border-gray-200 bg-gray-50 rounded-xl p-4 text-center text-gray-400 cursor-not-allowed">
                                                    <p className="text-sm font-medium">Tidak memerlukan bukti</p>
                                                </div>
                                            ) : (
                                                // Jika belum pilih status, area upload normal aktif
                                                <label className="cursor-pointer block">
                                                    <input
                                                        type="file"
                                                        accept=".pdf,.png,.jpg,.jpeg"
                                                        className="hidden"
                                                        onChange={(e) =>
                                                            onUpload(
                                                                mhs.id,
                                                                e.target.files?.[0]
                                                            )
                                                        }
                                                    />
                                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50 transition text-center">
                                                        <div className="flex justify-center mb-2">
                                                            <FiUpload size={20} className="text-blue-600" />
                                                        </div>
                                                        <p className="text-sm font-medium text-gray-700">Upload Bukti</p>
                                                        <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG · Max 5MB</p>
                                                    </div>
                                                </label>
                                            )
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center py-12 text-gray-400">
                                Tidak ada data mahasiswa
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}