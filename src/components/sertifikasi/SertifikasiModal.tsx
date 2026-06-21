import { useEffect, useState } from "react";
import type { Prodi } from "../../types/prodi";
import { getProdi } from "../../service/prodiService";
import { validateSertifikasi } from "../../utils/validators/sertifikasiValidate";
import { clearField } from "../../utils/utils";

export default function SertifikasiModal({
  sertifikasi,
  onClose,
  onSave,
}: any) {
  const isEdit = !!sertifikasi;

  const [errors, setErrors] = useState<any>({});
  const [prodiList, setProdiList] = useState<Prodi[]>([]);

  const [form, setForm] = useState({
    prodi_id: sertifikasi?.prodi_id || "",
    nama_sertifikasi: sertifikasi?.nama_sertifikasi || "",
    lembaga: sertifikasi?.lembaga || "",
    level: sertifikasi?.level || "",
    tanggal_sertifikasi: sertifikasi?.tanggal_sertifikasi || "",
    status: sertifikasi?.status ?? true,
  });

  useEffect(() => {
    const fetchProdi = async () => {
      try {
        const res = await getProdi();
        setProdiList(res.data ?? res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProdi();
  }, []);

  const handleSubmit = () => {
    const err = validateSertifikasi(form);
    setErrors(err);

    if (Object.keys(err).length > 0) return;

    const payload = {
      ...form,
      status: isEdit ? form.status : true,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg shadow-lg">
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEdit ? "Edit Sertifikasi" : "Tambah Sertifikasi"}
          </h2>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-sm text-gray-600">
              Program Studi
              {!isEdit && <span className="text-red-500 ml-1">*</span>}{" "}
            </label>

            <select
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none"
              value={form.prodi_id}
              onChange={(e) => {
                setForm({ ...form, prodi_id: e.target.value });
                clearField(setErrors, "prodi_id");
              }}
            >
              <option value="" disabled>Pilih Prodi</option>
              {prodiList
                .filter((p) => p.status === true)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nama_prodi}
                  </option>
                ))}
            </select>

            {errors.prodi_id && (
              <p className="text-red-500 text-xs mt-1">{errors.prodi_id}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Nama Sertifikasi
              {!isEdit && <span className="text-red-500 ml-1">*</span>}{" "}
            </label>

            <input
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none"
              value={form.nama_sertifikasi}
              onChange={(e) => {
                setForm({ ...form, nama_sertifikasi: e.target.value });
                clearField(setErrors, "nama_sertifikasi");
              }}
            />

            {errors.nama_sertifikasi && (
              <p className="text-red-500 text-xs mt-1">
                {errors.nama_sertifikasi}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Lembaga
              {!isEdit && <span className="text-red-500 ml-1">*</span>}
            </label>

            <input
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none"
              value={form.lembaga}
              onChange={(e) => {
                setForm({ ...form, lembaga: e.target.value });
                clearField(setErrors, "lembaga");
              }}
            />

            {errors.lembaga && (
              <p className="text-red-500 text-xs mt-1">{errors.lembaga}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Level
              {!isEdit && <span className="text-red-500 ml-1">*</span>}
            </label>

            <select
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none"
              value={form.level}
              onChange={(e) => {
                setForm({ ...form, level: e.target.value });
                clearField(setErrors, "level");
              }}
            >
              <option value="" disabled>Pilih Level</option>
              <option value="Nasional">Nasional</option>
              <option value="Internasional">Internasional</option>
            </select>

            {errors.level && (
              <p className="text-red-500 text-xs mt-1">{errors.level}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Tanggal Sertifikasi
              {!isEdit && <span className="text-red-500 ml-1">*</span>}
            </label>

            <input
              type="date"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none"
              value={form.tanggal_sertifikasi}
              onChange={(e) => {
                setForm({
                  ...form,
                  tanggal_sertifikasi: e.target.value,
                });
                clearField(setErrors, "tanggal_sertifikasi");
              }}
            />

            {errors.tanggal_sertifikasi && (
              <p className="text-red-500 text-xs mt-1">
                {errors.tanggal_sertifikasi}
              </p>
            )}
          </div>

          {isEdit && (
            <div>
              <label className="text-sm text-gray-600">Status</label>

              <select
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none"
                value={form.status ? "1" : "0"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value === "1",
                  })
                }
              >
                <option value="1">Aktif</option>
                <option value="0">Nonaktif</option>
              </select>
            </div>
          )}
        </div>

        <div className="p-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#4647AE] text-white rounded-lg hover:bg-[#3d3ea0]"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
