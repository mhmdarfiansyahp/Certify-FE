import { useEffect, useState } from "react";

interface Kompetensi {
    id: number;
    nama_sertifikasi: string;
    lembaga: string;
    level: string;
    tanggal: string;
    status: string;
}

export default function StatusKompetensiPage() {
    const [data, setData] = useState<Kompetensi[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchKompetensi();
    }, []);

    const fetchKompetensi = async () => {
        try {
            // DUMMY DATA
            const dummyData: Kompetensi[] = [
                {
                    id: 1,
                    nama_sertifikasi:
                        "Junior Web Developer",
                    lembaga: "BNSP",
                    level: "Junior",
                    tanggal: "2026-06-12",
                    status: "Lulus",
                },
                {
                    id: 2,
                    nama_sertifikasi:
                        "UI/UX Designer",
                    lembaga: "Google Career",
                    level: "Intermediate",
                    tanggal: "2026-05-20",
                    status: "Proses",
                },
                {
                    id: 3,
                    nama_sertifikasi:
                        "Data Analyst",
                    lembaga: "Dicoding",
                    level: "Advanced",
                    tanggal: "2026-04-10",
                    status: "Tidak Lulus",
                },
            ];

            // simulasi loading API
            setTimeout(() => {
                setData(dummyData);
                setLoading(false);
            }, 800);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "lulus":
                return "bg-green-100 text-green-700";

            case "proses":
                return "bg-yellow-100 text-yellow-700";

            case "tidak lulus":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-40">
                <p className="text-gray-500">
                    Memuat data kompetensi...
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Status Kompetensi
                </h1>

                <p className="text-gray-500 mt-1">
                    Informasi sertifikasi dan status
                    kompetensi pengguna
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-4 font-semibold">
                                Sertifikasi
                            </th>

                            <th className="text-left p-4 font-semibold">
                                Lembaga
                            </th>

                            <th className="text-left p-4 font-semibold">
                                Level
                            </th>

                            <th className="text-left p-4 font-semibold">
                                Tanggal
                            </th>

                            <th className="text-left p-4 font-semibold">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item) => (
                            <tr
                                key={item.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="p-4 font-medium text-gray-800">
                                    {item.nama_sertifikasi}
                                </td>

                                <td className="p-4 text-gray-600">
                                    {item.lembaga}
                                </td>

                                <td className="p-4 text-gray-600">
                                    {item.level}
                                </td>

                                <td className="p-4 text-gray-600">
                                    {new Date(
                                        item.tanggal
                                    ).toLocaleDateString("id-ID")}
                                </td>

                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                            item.status
                                        )}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center p-6 text-gray-500"
                                >
                                    Belum ada data kompetensi
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}