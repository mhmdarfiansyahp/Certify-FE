import { useEffect, useState } from "react";
import axios from "axios";
import ChartSection from "../components/dashboard/ChartSection";
import SertifikasiTable from "../components/dashboard/SertifikasiTable";
import FilterBar from "../components/dashboard/FilterBar";
import DetailModal from "../components/dashboard/DetailModal";

interface Sertifikasi {
  id_sertifikasi: number;
  nama_sertifikasi: string;
  tanggal_sertifikasi: string;
  lembaga: string;
  level: string;
  status: string;
  prodi: {
    id_prodi: number;
    nama_prodi: string;
    status: string;
  };
}

export default function Dashboard() {
  const [data, setData] = useState<Sertifikasi[]>([]);
  const [filtered, setFiltered] = useState<Sertifikasi[]>([]);

  const [year, setYear] = useState("");
  const [prodi, setProdi] = useState("");
  const [sertifikasi, setSertifikasi] = useState("");

  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dummy = [
      {
        id_sertifikasi: 1,
        nama_sertifikasi: "Web Development",
        tanggal_sertifikasi: "2026-01-10",
        lembaga: "BNSP",
        level: "Intermediate",
        status: "Tersedia",
        prodi: {
          id_prodi: 1,
          nama_prodi: "Informatika",
          status: "Aktif",
        },
      },
      {
        id_sertifikasi: 2,
        nama_sertifikasi: "UI/UX Design",
        tanggal_sertifikasi: "2026-02-15",
        lembaga: "Google",
        level: "Basic",
        status: "Tersedia",
        prodi: {
          id_prodi: 2,
          nama_prodi: "Sistem Informasi",
          status: "Aktif",
        },
      },
      {
        id_sertifikasi: 3,
        nama_sertifikasi: "Data Analyst",
        tanggal_sertifikasi: "2025-12-20",
        lembaga: "Microsoft",
        level: "Advanced",
        status: "Tersedia",
        prodi: {
          id_prodi: 1,
          nama_prodi: "Informatika",
          status: "Aktif",
        },
      },
    ];

    setData(dummy);
    setFiltered(dummy);
  };

  const applyFilter = (y: string, p: string, s: string) => {
    let temp = [...data];

    if (y) {
      temp = temp.filter((item) =>
        item.tanggal_sertifikasi.includes(y)
      );
    }

    if (p) {
      temp = temp.filter((item) => item.prodi.id_prodi == Number(p));
    }

    if (s) {
      temp = temp.filter((item) => item.id_sertifikasi == Number(s));
    }

    setFiltered(temp);
  };

  return (
    
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* FILTER */}
      <FilterBar
        onChange={(y, p, s) => {
          setYear(y);
          setProdi(p);
          setSertifikasi(s);
          applyFilter(y, p, s);
        }}
      />

      {/* CHART */}
      <ChartSection data={filtered} />

      {/* TABLE */}
      <SertifikasiTable
        data={filtered}
        onDetail={(item) => setSelected(item)}
      />

      {/* MODAL */}
      {selected && (
        <DetailModal
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}