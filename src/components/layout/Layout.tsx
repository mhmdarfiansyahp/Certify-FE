import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {

  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  return (
    <div className="bg-slate-100 min-h-screen">

      <Sidebar
        user={user}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <Navbar
        user={user}
        toggleSidebar={() => setIsOpen(!isOpen)}
      />

      <main
        className="
          pt-20 p-6
          lg:ml-64
        "
      >
        {children}
      </main>
    </div>
  );
}