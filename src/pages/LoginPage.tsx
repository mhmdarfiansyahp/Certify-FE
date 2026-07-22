import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import logoCertify from "../assets/certify_logo-removebg-preview.svg";

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

      if (data.user.role === "mahasiswa") {
        navigate("/status-kompetensi");
      } else if (data.user.role === "instruktur") {
        navigate("/dashboard");
      } else if (data.user.role === "admin") {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-4">
            <img
              src={logoCertify}
              alt="Certify Logo"
              className="h-28 mx-auto object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          <p className="text-sm font-medium text-gray-500 mt-4">
            Student Certification & Competency Platform
          </p>

          <div className="mt-3 text-xs text-gray-400 bg-gray-50 py-1.5 px-3 rounded-full inline-block border border-gray-100">
            Log in to manage assessment data and certificates
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <div className="relative mb-4">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm
              outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div className="relative mb-2">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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

          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")} 
              className="text-xs text-gray-500 hover:text-indigo-600 transition"
            >
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]
            transition text-white font-medium shadow-sm disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          {error && (
            <p className="text-red-500 text-xs mt-3 text-left">{error}</p>
          )}

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <button
            type="button"
            className="w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50
            text-gray-700 font-medium transition"
          >
            Certificate Verification
          </button>
        </div>
      </div>
    </div>
  );
}
