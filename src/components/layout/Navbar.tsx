import { useState } from "react";
import {
  FaBars,
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaKey,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/user";

interface NavbarProps {
  user?: User | null;
  toggleSidebar: () => void;
}

export default function Navbar({ user, toggleSidebar }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header
      className="
        fixed top-0 right-0 left-0
        lg:left-64
        h-16 bg-white border-b border-gray-200
        shadow-sm flex items-center justify-between
        px-6 z-30
      "
    >
      {/* Mobile Hamburger */}
      <button
        onClick={toggleSidebar}
        className="
          text-2xl text-slate-700
          lg:hidden
        "
      >
        <FaBars />
      </button>

      {/* RIGHT */}
      <div className="ml-auto relative">
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="
            flex items-center gap-3
            hover:bg-slate-100
            px-3 py-2 rounded-lg
            transition
          "
        >
          <FaUserCircle className="text-3xl text-slate-600" />

          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.username}</p>
          </div>

          <FaChevronDown
            className="
              text-sm text-slate-500
            "
          />
        </button>

        {/* Dropdown */}
        {openDropdown && (
          <div
            className="
              absolute right-0 mt-2
              w-52 bg-white
              rounded-xl shadow-lg
              border border-slate-200
              overflow-hidden
            "
          >
            <button
              className="
                w-full flex items-center gap-3
                px-4 py-3
                hover:bg-slate-100
              "
            >
              <FaUser />
              Profile
            </button>

            <button
              className="
                w-full flex items-center gap-3
                px-4 py-3
                hover:bg-slate-100
              "
            >
              <FaKey />
              Change Password
            </button>

            <button
              onClick={handleLogout}
              className="
              w-full flex items-center gap-3
              px-4 py-3
              text-red-500
              hover:bg-red-50
            "
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
