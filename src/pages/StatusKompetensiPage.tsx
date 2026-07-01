import { useEffect, useState } from "react";

import { getStatusKompetensi } from "../service/kompetensiService";
import type { Kompetensi } from "../types/kompetensi";
import { toastError } from "../utils/alert";

import TableSkeleton from "../components/ui/TableSkeleton";
import StatusKompetensiTable from "../components/kompetensi/StatusKompetensiTable";

export default function StatusKompetensiPage() {
    const [data, setData] = useState<Kompetensi[]>([]);
    const [loading, setLoading] = useState(true);

    // FETCH DATA
    const fetchData = async () => {
        try {
            setLoading(true);

            const result = await getStatusKompetensi();

            setData(result.data);
        } catch (error) {
            console.error(error);

            toastError("Gagal mengambil data kompetensi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Status Kompetensi
                    </h1>

                    <p className="text-sm text-gray-500">
                        Informasi sertifikasi dan status kompetensi pengguna
                    </p>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
                {/* HEADER */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-gray-800">
                            Data Kompetensi
                        </h2>

                        <p className="text-sm text-gray-500">
                            Total {data.length} sertifikasi
                        </p>
                    </div>
                </div>

                {loading ? (
                    <TableSkeleton />
                ) : (
                    <StatusKompetensiTable data={data} />
                )}
            </div>
        </div>
    );
}