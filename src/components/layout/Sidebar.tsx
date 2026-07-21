import {
  FaHome,
  FaUser,
  FaUniversity,
  FaCheckCircle,
  FaClipboardCheck,
  FaAward,
} from "react-icons/fa";
import logoCertify from '../../assets/logo_aja.svg';

import { NavLink } from "react-router-dom";
import type { User } from "../../types/user";

interface SidebarProps {
  user?: User | null;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Sidebar({ user, isOpen, setIsOpen }: SidebarProps) {
  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
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
        <div
          className="h-16 flex items-center gap-3 px-6 border-b"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <img
            src={logoCertify}
            alt="Certify Icon"
            className="h-14 w-auto object-contain transform hover:rotate-6 transition-transform duration-300"
          />

          <span className="font-bold text-xl tracking-wide text-white">
            Certify
          </span>
        </div>

        <div
          className="px-6 py-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-sm text-white/70">Welcome</p>
          <h2 className="font-semibold">{user?.name}</h2>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          {user?.role === "admin" && (
            <>
              <NavLink
                to="/dashboard"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
                    ? "text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#4382DF" } : {}
                }
              >
                <FaHome />
                Dashboard
              </NavLink>

              <NavLink
                to="/prodi"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
                    ? "text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#4382DF" } : {}
                }
              >
                <FaUniversity />
                Study Program
              </NavLink>

              <NavLink
                to="/sertifikasi"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
                    ? "text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#4382DF" } : {}
                }
              >
                <FaCheckCircle />
                Certifications
              </NavLink>

              <NavLink
                to="/pengguna"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
                    ? "text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#4382DF" } : {}
                }
              >
                <FaUser />
                Users
              </NavLink>
            </>
          )}

          {user?.role === "instruktur" && (
            <>
              <NavLink
                to="/dashboard"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
                    ? "text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#4382DF" } : {}
                }
              >
                <FaHome />
                Dashboard
              </NavLink>

              <NavLink
                to="/asesmen"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
                    ? "text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#4382DF" } : {}
                }
              >
                <FaClipboardCheck />
                Student Assessment
              </NavLink>
            </>
          )}

          {user?.role === "mahasiswa" && (
            <NavLink
              to="/status-kompetensi"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
                  ? "text-white shadow-md"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                }`
              }
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#4382DF" } : {}
              }
            >
              <FaAward />
              Competency Status
            </NavLink>
          )}
        </nav>
      </aside>
    </>
  );
}