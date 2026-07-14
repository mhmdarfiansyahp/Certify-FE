import type {
    MahasiswaAsesmen,
    StatusAsesmen,
} from "../../types/asesmen";
import AsesmenTableRow from "./AsesmenTableRow";

type FileMap = {
    [key: number]: File | null;
};

interface Props {
    data: (MahasiswaAsesmen & { is_saved?: boolean })[];
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
                        data.map((mhs, index) => (
                            <AsesmenTableRow
                                key={mhs.id}
                                mhs={mhs}
                                index={index}
                                file={files[mhs.id] || null}
                                onChangeStatus={onChangeStatus}
                                onUpload={onUpload}
                            />
                        ))
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