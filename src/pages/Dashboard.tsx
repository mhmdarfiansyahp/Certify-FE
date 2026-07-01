import { useEffect, useState } from "react";

import ChartSection from "../components/dashboard/ChartSection";
import FilterBar from "../components/dashboard/FilterBar";

import type { DashboardKompetensi } from "../types/dashboard";

import {
  getDashboardKompetensi,
} from "../service/dashboardService";

export default function Dashboard() {
  const [data, setData] = useState<DashboardKompetensi[]>([]);
  const [selected, setSelected] = useState<DashboardKompetensi | null>(null);
  const [year, setYear] = useState("");
  const [prodi, setProdi] = useState("");
  const [sertifikasi, setSertifikasi] = useState("");


  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async (
    tahun?: string,
    sertifikasi_id?: string,
    prodi_id?: string
  ) => {
    try {
      const result = await getDashboardKompetensi({
        tahun,
        sertifikasi_id,
        prodi_id,
      });
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* FILTER */}
      <FilterBar
        onChange={(year, prodi, sertifikasi) => {

          fetchDashboard(
            year,
            sertifikasi,
            prodi
          );

        }}
      />

      {/* CHART */}
      <ChartSection data={data} />
    </div>
  );
}