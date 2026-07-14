import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaInfoCircle,
    FaEye,
    FaEyeSlash,
    FaSave,
    FaCircleNotch
} from "react-icons/fa";

import { cn } from "../utils/utils";
import { changePassword } from "../service/userService";
import { toastSuccess, toastError } from "../utils/alert";

interface ApiErrors {
    [key: string]: string[] | undefined;
}

export default function ChangePasswordPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<ApiErrors>({});

    const [strength, setStrength] = useState({
        label: "Lemah",
        color: "text-red-500",
        bg: "bg-gray-200",
        width: "w-0"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    useEffect(() => {
        const pass = formData.password;
        if (!pass) {
            setStrength({ label: "Lemah", color: "text-gray-400", bg: "bg-gray-200", width: "w-0" });
            return;
        }

        const hasLetters = /[a-zA-Z]/.test(pass);
        const hasNumbers = /[0-9]/.test(pass);
        const isLongEnough = pass.length >= 8;

        if (isLongEnough && hasLetters && hasNumbers) {
            setStrength({ label: "Kuat", color: "text-green-600", bg: "bg-green-600", width: "w-full" });
        } else if (pass.length >= 6 || (hasLetters && hasNumbers)) {
            setStrength({ label: "Sedang", color: "text-orange-500", bg: "bg-orange-500", width: "w-2/3" });
        } else {
            setStrength({ label: "Lemah", color: "text-red-500", bg: "bg-red-500", width: "w-1/4" });
        }
    }, [formData.password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const response = await changePassword(formData);
            toastSuccess(response.message || "Kata sandi berhasil diperbarui!");
            setFormData({ current_password: "", password: "", password_confirmation: "" });
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || {});
                toastError("Periksa kembali form Anda.");
            } else {
                toastError("Terjadi kesalahan sistem.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 space-y-6">
            <div className="w-full space-y-6">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm">
                    <Link to="/dashboard" className="hover:text-[#4647AE] transition">
                        Dashboard
                    </Link>
                    <span>{">"}</span>
                    <span className="text-[#4647AE] font-medium">Ubah Kata Sandi</span>
                </div>

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Ubah Kata Sandi</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Pastikan akun Anda tetap aman dengan memperbarui kata sandi secara berkala.
                    </p>
                </div>

                {/* Card */}
                <div className={cn("bg-white rounded-3xl p-10 shadow-sm border border-gray-200")}>

                    {/* Info Box */}
                    <div className={cn("flex items-start gap-4 bg-[#F5F7FF] border border-[#D8DEFF] rounded-2xl p-5 mb-8")}>
                        <FaInfoCircle className="text-[#4647AE] mt-1" size={20} />
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-1">Keamanan Kata Sandi</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Kata sandi baru harus memiliki minimal 8 karakter dan merupakan kombinasi dari huruf serta angka untuk keamanan maksimal.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Current Password */}
                        <div>
                            <label className={cn("block text-sm font-semibold tracking-wide text-gray-700 uppercase mb-3")}>
                                Kata Sandi Saat Ini
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    name="current_password"
                                    value={formData.current_password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className={cn(
                                        "w-full rounded-xl border px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#4647AE] focus:border-transparent",
                                        errors.current_password ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showCurrent ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.current_password && (
                                <p className="text-red-500 text-sm mt-2 font-medium">{errors.current_password[0]}</p>
                            )}
                        </div>

                        {/* New Password Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Password Baru */}
                            <div>
                                <label className={cn("block text-sm font-semibold tracking-wide text-gray-700 uppercase mb-3")}>
                                    Kata Sandi Baru
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNew ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className={cn(
                                            "w-full rounded-xl border px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#4647AE] focus:border-transparent",
                                            errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                                        )}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showNew ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.password[0]}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className={cn("block text-sm font-semibold tracking-wide text-gray-700 uppercase mb-3")}>
                                    Konfirmasi Kata Sandi Baru
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className={cn("w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#4647AE] focus:border-transparent")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirm ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Password Strength */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600">Kekuatan Kata Sandi</span>
                                <span className={cn("font-semibold transition-colors duration-300", strength.color)}>
                                    {strength.label}
                                </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className={cn("h-full transition-all duration-500 rounded-full", strength.bg, strength.width)} />
                            </div>
                        </div>

                        {/* Divider & Action Buttons */}
                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-6 py-3 rounded-xl bg-[#4647AE] hover:bg-[#3d3ea0] text-white font-medium transition flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? <FaCircleNotch className="animate-spin" /> : <FaSave />}
                                    {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/dashboard")}
                                    disabled={isLoading}
                                    className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium transition disabled:opacity-50"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}