import { Link } from "react-router-dom";
import {
    FaInfoCircle,
    FaEye,
    FaSave,
} from "react-icons/fa";

import { cn } from "../utils/utils";

export default function ChangePasswordPage() {
    return (
        <div className="bg-gray-50 space-y-6">

            <div className="w-full space-y-6">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm">
                    <Link
                        to="/dashboard"
                        className="hover:text-[#4647AE] transition"
                    >
                        Dashboard
                    </Link>

                    <span>{">"}</span>

                    <span className="text-[#4647AE] font-medium">
                        Ubah Kata Sandi
                    </span>
                </div>

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Ubah Kata Sandi
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Pastikan akun Anda tetap aman dengan memperbarui
                        kata sandi secara berkala.
                    </p>
                </div>

                {/* Card */}
                <div
                    className={cn(
                        "bg-white rounded-3xl",
                        "p-10 shadow-sm",
                        "border border-gray-200"
                    )}>

                    {/* Info Box */}
                    <div
                        className={cn(
                            "flex items-start gap-4",
                            "bg-[#F5F7FF]",
                            "border border-[#D8DEFF]",
                            "rounded-2xl",
                            "p-5 mb-8"
                        )}>
                        <FaInfoCircle
                            className="text-[#4647AE] mt-1"
                            size={20}
                        />

                        <div>
                            <h3 className="font-semibold text-gray-800 mb-1">
                                Keamanan Kata Sandi
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                Kata sandi baru harus memiliki minimal 8 karakter
                                dan merupakan kombinasi dari huruf serta angka
                                untuk keamanan maksimal.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-8">

                        {/* Current Password */}
                        <div>
                            <label
                                className={cn(
                                    "block text-sm",
                                    "font-semibold",
                                    "tracking-wide",
                                    "text-gray-700",
                                    "uppercase mb-3"
                                )}>
                                Kata Sandi Saat Ini
                            </label>

                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className={cn(
                                        "w-full rounded-xl",
                                        "border border-gray-300",
                                        "px-4 py-3",
                                        "pr-12",
                                        "outline-none",
                                        "focus:ring-2",
                                        "focus:ring-[#4647AE]",
                                        "focus:border-transparent")} />

                                <button
                                    type="button"
                                    className="
                    absolute right-4 top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                                >
                                    <FaEye />
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Password Baru */}
                            <div>
                                <label
                                    className="
                    block text-sm
                    font-semibold
                    tracking-wide
                    text-gray-700
                    uppercase mb-3
                  "
                                >
                                    Kata Sandi Baru
                                </label>

                                <div className="relative">
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="
                      w-full rounded-xl
                      border border-gray-300
                      px-4 py-3
                      pr-12
                      outline-none
                      focus:ring-2
                      focus:ring-[#4647AE]
                      focus:border-transparent
                    "
                                    />

                                    <button
                                        type="button"
                                        className="
                      absolute right-4 top-1/2
                      -translate-y-1/2
                      text-gray-500
                    "
                                    >
                                        <FaEye />
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    className="
                    block text-sm
                    font-semibold
                    tracking-wide
                    text-gray-700
                    uppercase mb-3
                  "
                                >
                                    Konfirmasi Kata Sandi Baru
                                </label>

                                <div className="relative">
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="
                      w-full rounded-xl
                      border border-gray-300
                      px-4 py-3
                      pr-12
                      outline-none
                      focus:ring-2
                      focus:ring-[#4647AE]
                      focus:border-transparent
                    "
                                    />

                                    <button
                                        type="button"
                                        className="
                      absolute right-4 top-1/2
                      -translate-y-1/2
                      text-gray-500
                    "
                                    >
                                        <FaEye />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Password Strength */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600">
                                    Kekuatan Kata Sandi
                                </span>

                                <span className="text-green-600 font-semibold">
                                    Kuat
                                </span>
                            </div>

                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-green-600 rounded-full" />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 pt-6">

                            {/* Action */}
                            <div className="flex items-center gap-4">

                                <button
                                    className="
                    px-6 py-3 rounded-xl
                    bg-[#4647AE]
                    hover:bg-[#3d3ea0]
                    text-white
                    font-medium
                    transition
                    flex items-center gap-3
                  "
                                >
                                    <FaSave />
                                    Simpan Perubahan
                                </button>

                                <button
                                    className="
                    px-6 py-3 rounded-xl
                    border border-gray-300
                    hover:bg-gray-100
                    text-gray-700
                    font-medium
                    transition
                  "
                                >
                                    Batal
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}