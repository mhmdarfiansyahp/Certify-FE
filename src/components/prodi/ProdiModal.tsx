import { useState } from "react";
import { validateProdi } from "../../utils/validators/prodiValidate";
import { clearField } from "../../utils/utils";

export default function ProdiModal({ prodi, onClose, onSave }: any) {
  const isEdit = !!prodi;

  const [form, setForm] = useState({
    nama_prodi: prodi?.nama_prodi || "",
    status: prodi?.status ?? true,
  });

  const [errors, setErrors] = useState<any>({});

  const handleSubmit = () => {
    const err = validateProdi(form);
    setErrors(err);

    if (Object.keys(err).length > 0) return;

    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg shadow-lg">
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEdit ? "Edit Study Program" : "Add Study Program"}
          </h2>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-sm text-black">
              Study Program Name
              {!isEdit && <span className="text-red-500 ml-1">*</span>}{" "}
            </label>

            <input
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none"
              placeholder="Informatics"
              value={form.nama_prodi}
              onChange={(e) => {
                setForm({ ...form, nama_prodi: e.target.value });
                clearField(setErrors, "nama_prodi");
              }}
            />

            {errors.nama_prodi && (
              <p className="text-red-500 text-xs mt-1">{errors.nama_prodi}</p>
            )}
          </div>

          {isEdit && (
            <div>
              <label className="text-sm text-black">Status</label>

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
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          )}
        </div>

        <div className="p-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#4647AE] text-white rounded-lg hover:bg-[#3d3ea0]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}