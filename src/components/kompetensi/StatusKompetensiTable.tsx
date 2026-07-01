import type { Kompetensi } from "../../types/kompetensi";

import {
    downloadSertifikat,
} from "../../service/kompetensiService";

import {
    toastError,
    toastSuccess,
} from "../../utils/alert";

interface Props {
    data: Kompetensi[];
}

export default function StatusKompetensiTable({ data, }: Props) {
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
            const response = await downloadSertifikat(id);
            const blob = new Blob(
                [response.data],
                {
                    type: "application/pdf",
                }
            );

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download = `${nama}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
            toastSuccess(
                "File berhasil diunduh"
            );
        } catch (error) {
            console.error(error);
            toastError(
                "Gagal mengunduh sertifikat"
            );
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-3 md:p-4 text-sm font-semibold">
                            Sertifikasi
                        </th>

                        <th className="text-left p-3 md:p-4 text-sm font-semibold">
                            Lembaga
                        </th>

                        <th className="text-left p-3 md:p-4 text-sm font-semibold">
                            Level
                        </th>

                        <th className="text-left p-3 md:p-4 text-sm font-semibold">
                            Tanggal
                        </th>

                        <th className="text-left p-3 md:p-4 text-sm font-semibold">
                            Status
                        </th>

                        <th className="text-left p-3 md:p-4 text-sm font-semibold">
                            Bukti
                        </th>
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
                                {new Date(
                                    item.tanggal
                                ).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </td>
                            <td className="p-3 md:p-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${getStatusColor(
                                        item.status
                                    )}`}
                                >
                                    {item.status}
                                </span>
                            </td>
                            <td className="p-3 md:p-4">
                                {item.has_file ? (
                                    <button
                                        onClick={() =>
                                            handleDownload(
                                                item.id,
                                                item.nama_sertifikasi
                                            )
                                        }
                                        className="px-3 md:px-4 py-2 text-sm rounded-lg bg-[#4647AE] text-white hover:bg-[#3d3ea0] whitespace-nowrap transition"
                                    >
                                        Unduh
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="px-3 md:px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed whitespace-nowrap"
                                    >
                                        Belum Ada Bukti
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td
                                colSpan={6}
                                className="text-center p-6 text-gray-500"
                            >
                                Belum ada data kompetensi
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}