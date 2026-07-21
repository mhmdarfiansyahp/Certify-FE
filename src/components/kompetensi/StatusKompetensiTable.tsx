import { useState } from "react";
import type { Kompetensi } from "../../types/kompetensi";
import { downloadSertifikat } from "../../service/kompetensiService";
import { toastError, toastSuccess } from "../../utils/alert";

interface Props {
    data: Kompetensi[];
}

export default function StatusKompetensiTable({ data }: Props) {
    // 1. State untuk melacak ID yang sedang di-download agar loading spinner muncul per baris
    const [downloadingId, setDownloadingId] = useState<number | null>(null);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "kompeten":
                return "bg-green-100 text-green-700";
            case "tidak kompeten":
                return "bg-red-100 text-red-700";
            case "tidak hadir":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const handleDownload = async (id: number, nama: string) => {
        try {
            setDownloadingId(id);

            // 2. Panggil API service
            const response = await downloadSertifikat(id);

            // 3. Gunakan response.data secara langsung karena service Anda sudah menggunakan { responseType: "blob" }
            const blob = response.data;
            const url = window.URL.createObjectURL(blob);

            // 4. Proses trigger download di browser
            const link = document.createElement("a");
            link.href = url;

            // Menyeragamkan format nama file hasil unduhan
            const formattedName = nama.replace(/\s+/g, "_");
            link.download = `Surat_Keterangan_${formattedName}.pdf`;

            document.body.appendChild(link);
            link.click();

            // 5. Cleanup DOM dan memori browser
            link.remove();
            window.URL.revokeObjectURL(url);

            toastSuccess("Surat Keterangan berhasil diunduh");
        } catch (error) {
            console.error(error);
            toastError("Gagal mengunduh surat keterangan kompetensi");
        } finally {
            setDownloadingId(null);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-3 md:p-4 text-sm font-semibold">Sertifikasi</th>
                        <th className="text-left p-3 md:p-4 text-sm font-semibold">Lembaga</th>
                        <th className="text-left p-3 md:p-4 text-sm font-semibold">Level</th>
                        <th className="text-left p-3 md:p-4 text-sm font-semibold">Tanggal</th>
                        <th className="text-left p-3 md:p-4 text-sm font-semibold">Status</th>
                        <th className="text-center p-3 md:p-4 text-sm font-semibold ">Unduh SKK</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            className="border-b border-gray-100 hover:bg-gray-50 transition"
                        >
                            <td className="p-3 md:p-4 font-medium text-gray-800 text-sm">
                                {item.nama_sertifikasi}
                            </td>

                            <td className="p-3 md:p-4 text-gray-600 text-sm">
                                {item.lembaga}
                            </td>

                            <td className="p-3 md:p-4 text-gray-600 text-sm">
                                {item.level}
                            </td>

                            <td className="p-3 md:p-4 text-gray-600 text-sm whitespace-nowrap">
                                {new Date(item.tanggal).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </td>

                            <td className="p-3 md:p-4">
                                <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${getStatusColor(item.status)}`}>
                                    {item.status}
                                </span>
                            </td>

                            <td className="p-3 md:p-4 text-center">
                                {/* 6. Tombol download Surat Keterangan Kompetensi (SKK) hanya aktif jika statusnya memang "Kompeten" */}
                                {item.status.toLowerCase() === "kompeten" ? (
                                    <button
                                        onClick={() => handleDownload(item.id, item.nama_sertifikasi)}
                                        disabled={downloadingId === item.id}
                                        className="inline-flex items-center justify-center gap-2 px-3 md:px-4 py-2 text-sm rounded-lg bg-[#4647AE] text-white hover:bg-[#3d3ea0] disabled:bg-indigo-300 disabled:cursor-not-allowed whitespace-nowrap transition"
                                    >
                                        {downloadingId === item.id ? (
                                            <>
                                                {/* Loading Spinner */}
                                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Mengunduh...
                                            </>
                                        ) : (
                                            "Unduh SKK"
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="px-3 md:px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed whitespace-nowrap"
                                    >
                                        Belum Tersedia
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}

                    {data.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-center p-6 text-gray-500">
                                Belum ada data kompetensi
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}