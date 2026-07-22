import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logoCertify from "../assets/certify_logo-removebg-preview.svg";
import { forgotPassword } from "../service/authService";
import { toastSuccess } from "../utils/alert";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 

    try {
      const data = await forgotPassword({ email });
      const successMsg =
        data.message ||
        "Password reset instructions have been sent to your email.";
      toastSuccess(successMsg);
      setEmail("");
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Failed to send reset password email";

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 px-6">
      <div className="w-full max-w-md">
        {/* Header / Logo */}
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
            Reset your password to regain account access
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-center text-gray-900 mb-1">
            Forgot Password?
          </h2>
          <p className="text-xs text-center text-gray-500 mb-6 leading-relaxed">
            Enter your email address to receive password reset instructions.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                placeholder="name@institution.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm
                outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs bg-red-50 p-3 rounded-xl border border-red-200 mb-4 text-center font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]
              transition text-white font-medium shadow-sm disabled:opacity-50 text-sm cursor-pointer"
            >
              {loading ? "Sending..." : "Send Instructions"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50
            text-gray-700 font-medium transition text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </div>

        <p className="text-center text-[11px] text-gray-400 font-medium mt-6">
          © {new Date().getFullYear()} Academic Portal. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
