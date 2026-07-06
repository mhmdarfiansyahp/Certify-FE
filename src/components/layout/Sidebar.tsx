import {
  FaHome,
  FaUser,
  FaUniversity,
  FaCheckCircle,
  FaClipboardCheck,
  FaAward,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import type { User } from "../../types/user";
interface SidebarProps {
  user?: User | null;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Sidebar({ user, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0
          w-64 h-screen
          flex flex-col
          text-white
          z-50
          transition-transform duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
        style={{ backgroundColor: "#4647AE" }}
      >
        {/* LOGO */}
        <div
          className="h-16 flex items-center px-6 border-b"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <img
            src="/assets/image/palingbaru_logo.png"
            alt="Logo"
            className="h-10"
          />
        </div>

        <div
          className="px-6 py-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-sm text-white/70">Welcome</p>
          <h2 className="font-semibold">{user?.name}</h2>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 flex flex-col gap-2">


          {user?.role === "admin" && (
            <>
              <NavLink
                to="/dashboard"
                className={({
                  isActive,
                }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive
                    ? "text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#4382DF" } : {}
                }
              >
                <FaHome />
                Dashboard
              </NavLink>

              <NavLink
                to="/prodi"
                className={({
                  isActive,
                }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive
                    ? "text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#4382DF" } : {}
                }
              >
                <FaUniversity />
                Program Studi
              </NavLink>

              <NavLink
                to="/sertifikasi"
                className={({
                  isActive,
                }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive
                    ? "text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#4382DF" } : {}
                }
              >
                <FaCheckCircle />
                Sertifikasi
              </NavLink>

              <NavLink
                to="/pengguna"
                className={({
                  isActive,
                }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive
                    ? "text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#4382DF" } : {}
                }
              >
                <FaUser />
                Pengguna
              </NavLink>
            </>
          )}

          {user?.role === "instruktur" && (
            <>
              <NavLink
                to="/dashboard"
                className={({
                  isActive,
                }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive
                    ? "text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#4382DF" } : {}
                }
              >
                <FaHome />
                Dashboard
              </NavLink>
              
              <NavLink
                to="/asesmen"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${isActive
                    ? "text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#4382DF" } : {}
                }
              >
                <FaClipboardCheck />
                Asesmen Mahasiswa
              </NavLink>
            </>
          )}

          {user?.role === "mahasiswa" && (
            <NavLink
              to="/status-kompetensi"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive
                  ? "text-white shadow-md"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                }`
              }
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#4382DF" } : {}
              }
            >
              <FaAward />
              Status Kompetensi
            </NavLink>
          )}
        </nav>
      </aside>
    </>
  );
}
