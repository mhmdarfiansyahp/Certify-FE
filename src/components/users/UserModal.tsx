import { useEffect, useState } from "react";
import { getProdi } from "../../service/prodiService";
import type { Prodi } from "../../types/prodi";
import { validateUser } from "../../utils/validators/userValidate";
import { clearField } from "../../utils/utils";

export default function UserModal({ user, onClose, onSave }: any) {
  const isEdit = !!user;
  const [errors, setErrors] = useState<any>({});
  const [prodiList, setProdiList] = useState<Prodi[]>([]);

  const [form, setForm] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "",
    prodi_id: user?.prodi_id || "",
    status: user?.status ?? true,
    password: "",
  });

  useEffect(() => {
    const fetchProdi = async () => {
      try {
        const res = await getProdi();

        setProdiList(res.data ?? res);
      } catch (err) {
        console.log("Failed to fetch study programs", err);
      }
    };

    fetchProdi();
  }, []);

  const handleSubmit = () => {
    const err = validateUser(form);
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
            {isEdit ? "Edit User" : "Add User"}
          </h2>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-sm text-gray-600">
              Name
              {!isEdit && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none"
              placeholder="Name"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                clearField(setErrors, "name");
              }}
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Username
              {!isEdit && <span className="text-red-500 ml-1">*</span>}{" "}
            </label>

            <input
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none"
              placeholder="Username"
              value={form.username}
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
                clearField(setErrors, "username");
              }}
            />

            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Email
              {!isEdit && <span className="text-red-500 ml-1">*</span>}{" "}
            </label>

            <input
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none"
              placeholder="Email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                clearField(setErrors, "email");
              }}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Role
              {!isEdit && <span className="text-red-500 ml-1">*</span>}{" "}
            </label>

            <select
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none"
              value={form.role}
              onChange={(e) => {
                setForm({ ...form, role: e.target.value });
                clearField(setErrors, "role");
              }}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="instruktur">Instructor</option>
              <option value="mahasiswa">Student</option>
            </select>

            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Study Program
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
              <option value="">Select Study Program</option>

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
              Password
              {!isEdit && <span className="text-red-500 ml-1">*</span>}
            </label>

            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none"
              placeholder={isEdit ? "•••••• (optional)" : "Password"}
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
          </div>
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