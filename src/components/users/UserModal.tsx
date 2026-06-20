import { useState } from "react";
import type { User } from "../../types/User";

export default function UserModal({
    user,
    onClose,
    onSave,
}: any) {

    const [form, setForm] = useState({
        name: user?.name || "",
        username: user?.username || "",
        email: user?.email || "",
        role: user?.role || "admin",
        status: user?.status ?? true,
        password: "",
    });

    const handleSubmit = () => {
        onSave(form);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

                {/* HEADER */}
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">
                        {user ? "Edit User" : "Tambah User"}
                    </h2>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-4">

                    <input
                        className="w-full p-3 border rounded-xl"
                        placeholder="Nama"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        className="w-full p-3 border rounded-xl"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) =>
                            setForm({ ...form, username: e.target.value })
                        }
                    />

                    <input
                        className="w-full p-3 border rounded-xl"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <select
                        className="w-full p-3 border rounded-xl"
                        value={form.role}
                        onChange={(e) =>
                            setForm({ ...form, role: e.target.value })
                        }
                    >
                        <option value="admin">Admin</option>
                        <option value="instruktur">Instruktur</option>
                        <option value="mahasiswa">Mahasiswa</option>
                    </select>

                    <select
                        className="w-full p-3 border rounded-xl"
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

                {/* FOOTER */}
                <div className="p-6 border-t flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-xl"
                    >
                        Batal
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2 bg-[#4647AE] text-white rounded-xl"
                    >
                        Simpan
                    </button>

                </div>

            </div>

        </div>
    );
}