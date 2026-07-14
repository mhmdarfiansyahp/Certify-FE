import type { MahasiswaAsesmen, StatusAsesmen } from "../../types/asesmen";
import { useState, useEffect, useRef } from "react";
import { FiUpload, FiFileText, FiEye, FiDownload, FiRefreshCw } from "react-icons/fi";

interface RowProps {
    mhs: MahasiswaAsesmen;
    index: number;
    file: File | null;
    onChangeStatus: (id: number, value: StatusAsesmen) => void;
    onUpload: (id: number, file?: File) => void;
}

export default function AsesmenTableRow({ mhs, index, file, onChangeStatus, onUpload }: RowProps) {
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const initialStatusFromDB = useRef(mhs.status);

    const isRowDisabled =
        initialStatusFromDB.current !== "" &&
        initialStatusFromDB.current !== undefined &&
        initialStatusFromDB.current !== null;

    useEffect(() => {
        if (!file) {
            setPreviewUrl("");
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [file]);

    const membutuhkanBukti = mhs.status === "Kompeten";

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
            <td className="px-5 py-4">{index + 1}</td>
            <td className="px-5 py-4 font-medium text-gray-700">{mhs.nim}</td>
            <td className="px-5 py-4">{mhs.nama}</td>
            <td className="px-5 py-4">
                <select
                    value={mhs.status || ""}
                    disabled={isRowDisabled}
                    onChange={(e) => onChangeStatus(mhs.id, e.target.value as StatusAsesmen)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                    <option value="">Pilih Hasil</option>
                    <option value="Kompeten">Kompeten</option>
                    <option value="Tidak Kompeten">Tidak Kompeten</option>
                    <option value="Tidak Hadir">Tidak Hadir</option>
                </select>
            </td>
            <td className="px-5 py-4">
                {/* Logika Bukti Sertifikasi */}
                {!membutuhkanBukti ? (
                    <div className="border border-dashed border-gray-200 bg-gray-50 rounded-xl p-3.5 text-center text-gray-400 cursor-not-allowed select-none">
                        <p className="text-sm font-medium">
                            {mhs.status ? "Tidak memerlukan bukti" : "Pilih status Kompeten untuk upload"}
                        </p>
                    </div>
                ) : file || mhs.bukti_pendukung ? (
                    <div className="border border-gray-200 rounded-xl p-3 bg-gray-50">
                        <div className="flex items-center gap-3">
                            {file?.type?.startsWith("image") || mhs.bukti_pendukung?.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                <img
                                    src={previewUrl || mhs.bukti_pendukung || undefined}
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
                                    {file ? file.name : mhs.bukti_pendukung?.split('/').pop() || "Bukti Pendukung"}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    {file && (
                                        <span className="text-xs text-gray-500">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </span>
                                    )}
                                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${isRowDisabled ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-700'}`}>
                                        {isRowDisabled ? "Saved" : "Ready"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <button
                                type="button"
                                onClick={() => window.open(previewUrl || mhs.bukti_pendukung || undefined)}
                                className="p-2 rounded-lg border bg-white hover:bg-gray-100 transition"
                                title="Preview"
                            >
                                <FiEye size={14} />
                            </button>

                            {!isRowDisabled && (
                                <label
                                    className="cursor-pointer p-2 rounded-lg border bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                                    title="Ganti File"
                                >
                                    <input
                                        type="file"
                                        accept=".pdf,.png,.jpg,.jpeg"
                                        className="hidden"
                                        onChange={(e) => onUpload(mhs.id, e.target.files?.[0])}
                                    />
                                    <FiRefreshCw size={14} />
                                </label>
                            )}
                        </div>
                    </div>
                ) : (
                    <label className={`block ${isRowDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                        <input
                            type="file"
                            disabled={isRowDisabled}
                            accept=".pdf,.png,.jpg,.jpeg"
                            className="hidden"
                            onChange={(e) => onUpload(mhs.id, e.target.files?.[0])}
                        />
                        <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 bg-blue-50/30 hover:bg-blue-50 hover:border-blue-400 transition text-center">
                            <div className="flex justify-center mb-1">
                                <FiUpload size={18} className="text-blue-600" />
                            </div>
                            <p className="text-sm font-semibold text-blue-700">Upload Bukti Kompetensi</p>
                            <p className="text-xs text-gray-500 mt-0.5">PDF, JPG, PNG · Max 5MB</p>
                        </div>
                    </label>
                )}
            </td>
        </tr>
    );
}