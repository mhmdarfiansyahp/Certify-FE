import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import logoCertify from "../assets/certify_logo-removebg-preview.svg";
import { resetPassword } from "../service/authService";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !email) {
      setError("Invalid or missing password reset token/email.");
    }
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError("Password confirmation does not match.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await resetPassword({
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      setMessage(data.message || "Your password has been successfully reset.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 px-6 py-12">
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
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-center text-gray-900 mb-1">
            Create New Password
          </h2>
          <p className="text-xs text-center text-gray-500 mb-6 leading-relaxed">
            Please enter your new password below for account{" "}
            <span className="font-semibold text-gray-700">{email}</span>.
          </p>

          <form onSubmit={handleSubmit}>
            {/* New Password Input */}
            <div className="mb-4">
              <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
                NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm
                  outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <FiLock className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
                CONFIRM NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Repeat new password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm
                  outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <FiLock className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Alerts */}
            {message && (
              <p className="text-emerald-600 text-xs bg-emerald-50 p-3 rounded-xl border border-emerald-200 mb-4 text-center font-medium">
                {message}
              </p>
            )}
            {error && (
              <p className="text-red-500 text-xs bg-red-50 p-3 rounded-xl border border-red-200 mb-4 text-center font-medium">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !token || !email}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]
              transition text-white font-medium shadow-sm disabled:opacity-50 text-sm cursor-pointer"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Back to Login Button */}
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

        {/* Footer */}
        <p className="text-center text-[11px] text-gray-400 font-medium mt-6">
          © {new Date().getFullYear()} Academic Portal. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
