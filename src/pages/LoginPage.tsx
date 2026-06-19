import { useState } from "react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
} from "react-icons/fi";

import { login } from "../service/authService";
import type { LoginRequest } from "../types/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await login(form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 px-6">

      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center shadow-md mb-4">
            <FiShield className="text-white" />
          </div>

          <h1 className="text-xl font-semibold">CertifyPro</h1>

          <p className="text-sm text-gray-500 mt-2">
            Platform sertifikasi & kompetensi mahasiswa
          </p>

          <div className="mt-3 text-xs text-gray-400">
            Masuk untuk mengelola data asesmen & sertifikat
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">

          {/* EMAIL */}
          <div className="relative mb-4">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm
              outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-2">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm
              outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              {showPw ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* LUPA PASSWORD */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              className="text-xs text-gray-500 hover:text-indigo-600 transition"
            >
              Lupa password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]
            transition text-white font-medium shadow-sm disabled:opacity-50"
          >
            {loading ? "Loading..." : "Masuk"}
          </button>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-xs mt-3 text-left">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-xs text-gray-400">atau</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <button
            type="button"
            className="w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50
            text-gray-700 font-medium transition"
          >
            Verifikasi Sertifikat
          </button>

        </div>
      </div>
    </div>
  );
}