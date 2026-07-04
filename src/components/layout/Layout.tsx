import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {

  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  useEffect(() => {
    const syncUser = () => {
      setUser(
        JSON.parse(localStorage.getItem("user") || "null")
      );
    };
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  return (
    <div className="h-screen bg-slate-100 overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        user={user}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Navbar */}
      <Navbar
        user={user}
        toggleSidebar={() => setIsOpen(!isOpen)}
      />

      {/* Content */}
      <main
        className="
          h-full
          overflow-y-auto
          pt-20
          p-6
          lg:ml-64
        "
      >
        {children}
      </main>
    </div>
  );
}