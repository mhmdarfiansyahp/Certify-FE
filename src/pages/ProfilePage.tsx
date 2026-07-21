import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    FaMapMarkerAlt,
    FaUser,
    FaCheckCircle,
    FaSave,
} from "react-icons/fa";

import {
    MdEdit,
    MdWorkOutline,
} from "react-icons/md";

import {
    getProfile,
    updateProfile,
} from "../service/userService";

import {
    toastSuccess,
    toastError,
} from "../utils/alert";
import { cn } from "../utils/utils";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        role: "",
        prodi: "",
        nim: "",
        nip: "",
        status: true,
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await getProfile();

            setForm({
                name: res.name || "",
                username: res.username || "",
                email: res.email || "",
                role: res.role || "",
                prodi: res.prodi?.nama_prodi || "",
                nim: res.nim || "",
                nip: res.nip || "",
                status: res.status ?? true,
            });
        } catch (err) {
            toastError("Failed to fetch profile");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const res = await updateProfile({
                name: form.name,
                email: form.email,
            });

            const oldUser = JSON.parse(
                localStorage.getItem("user") || "{}"
            );

            const updatedUser = {
                ...oldUser,
                name: res.data?.name || form.name,
                email: res.data?.email || form.email,
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));

            window.dispatchEvent(new Event("userProfileUpdated"));

            setForm((prev) => ({
                ...prev,
                name: res.data?.name || prev.name,
                email: res.data?.email || prev.email,
            }));

            toastSuccess("Profile updated successfully");
            setIsEdit(false);
        } catch (err) {
            toastError("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <p className="text-gray-500 animate-pulse">Loading profile data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm">
                <Link to="/dashboard" className="hover:text-[#4647AE] transition">
                    Dashboard
                </Link>
                <span>{">"}</span>
                <span className="font-medium text-[#4647AE]">Profile</span>
            </div>

            <div>
                <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
                <p className="text-sm text-gray-500">User account information</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-32 bg-linear-to-r from-[#3730A3] to-[#4F46E5]" />
                <div className="relative px-6 pb-6">
                    <div className="absolute -top-10 left-6">
                        <img
                            src="https://i.pravatar.cc/150?img=12"
                            alt="profile"
                            className={cn(
                                "w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md"
                            )}
                        />
                    </div>

                    <div className="pt-5 flex items-start justify-between">
                        <div className="ml-32">
                            <h2 className="text-2xl font-bold text-gray-900">{form.name}</h2>
                            <div className="flex items-center gap-3 mt-2 flex-wrap">
                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium uppercase">
                                    {form.role}
                                </span>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <FaMapMarkerAlt />
                                    <span>Indonesia</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {!isEdit ? (
                                <button
                                    onClick={() => setIsEdit(true)}
                                    className="px-4 py-2 rounded-xl bg-[#4647AE] hover:bg-[#3d3ea0] text-white transition flex items-center gap-2 text-sm font-medium"
                                >
                                    <MdEdit size={18} />
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsEdit(false)}
                                        disabled={saving}
                                        className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-sm font-medium transition"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="px-4 py-2 rounded-xl bg-[#4647AE] hover:bg-[#3d3ea0] disabled:opacity-50 text-white transition flex items-center gap-2 text-sm font-medium"
                                    >
                                        <FaSave />
                                        {saving ? "Saving..." : "Save"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                        <FaUser className="text-[#4647AE]" size={20} />
                    </div>

                    <div className="space-y-5">
                        <div className="border-b border-gray-100 pb-4">
                            <p className="text-xs uppercase text-gray-400 font-semibold mb-2">FULL NAME</p>
                            {isEdit ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-[#4647AE]"
                                />
                            ) : (
                                <p className="text-base text-gray-800">{form.name}</p>
                            )}
                        </div>

                        <div className="border-b border-gray-100 pb-4">
                            <p className="text-xs uppercase text-gray-400 font-semibold mb-2">Username</p>
                            <p className="text-base text-gray-800">{form.username}</p>
                        </div>

                        <div className="border-b border-gray-100 pb-4">
                            <p className="text-xs uppercase text-gray-400 font-semibold mb-2">Email</p>
                            {isEdit ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-[#4647AE]"
                                />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <p className="text-base text-gray-800">{form.email}</p>
                                    <FaCheckCircle className="text-green-500" size={14} />
                                </div>
                            )}
                        </div>

                        {form.role === "mahasiswa" && (
                            <div className="border-b border-gray-100 pb-4">
                                <p className="text-xs uppercase text-gray-400 font-semibold mb-2">Student ID (NIM)</p>
                                <p className="text-base text-gray-800">{form.nim || "-"}</p>
                            </div>
                        )}

                        {(form.role === "admin" || form.role === "instruktur") && (
                            <div>
                                <p className="text-xs uppercase text-gray-400 font-semibold mb-2">Employee ID (NIP)</p>
                                <p className="text-base text-gray-800">{form.nip || "-"}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Professional Details</h2>
                        <MdWorkOutline className="text-[#4647AE]" size={22} />
                    </div>

                    <div className="space-y-5">
                        <div className="border-b border-gray-100 pb-4">
                            <p className="text-xs uppercase text-gray-400 font-semibold mb-2">Role</p>
                            <p className="text-base text-gray-800 capitalize">{form.role}</p>
                        </div>

                        <div className="border-b border-gray-100 pb-4">
                            <p className="text-xs uppercase text-gray-400 font-semibold mb-2">Study Program</p>
                            <p className="text-base text-gray-800">{form.prodi || "-"}</p>
                        </div>

                        <div>
                            <p className="text-xs uppercase text-gray-400 font-semibold mb-2">Status</p>
                            <span className={cn(
                                "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium",
                                form.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            )}>
                                <span className={cn(
                                    "w-2 h-2 rounded-full",
                                    form.status ? "bg-green-600" : "bg-red-600"
                                )} />
                                {form.status ? "ACTIVE" : "INACTIVE"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}