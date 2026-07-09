import { useEffect, useState } from "react";

import ChartSection from "../components/dashboard/ChartSection";
import FilterBar from "../components/dashboard/FilterBar";
import { getSertifikasi } from "../service/sertifikasiService";

import type {
  DashboardKompetensi,
  DashboardSummary
} from "../types/dashboard";

import {
  getDashboardKompetensi,
  exportDashboardExcel,
  exportDashboardPdf
} from "../service/dashboardService";

import {
  FaCheckCircle,
  FaClipboard,
  FaFileExcel,
  FaFilePdf,
  FaUsers
} from "react-icons/fa";
import { cn } from "../utils/utils";

export default function Dashboard() {

  const [data, setData] =
    useState<DashboardKompetensi[]>([]);

  const [year, setYear] = useState("");
  const [prodi, setProdi] = useState("");
  const [sertifikasi, setSertifikasi] = useState("");
  const [sertifikasiList, setSertifikasiList] = useState([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);


  useEffect(() => {
    fetchDashboard();
    fetchSertifikasi();
  }, []);

  const fetchSertifikasi = async () => {
    try {
      const res = await getSertifikasi();

      setSertifikasiList(res.data);

    } catch (err) {
      console.error(err);
    }
  };

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

      setData(result.data);
      setSummary(result.summary);

    } catch (error) {
      console.error(error);
    }
  };

  const handleExportExcel = async () => {

    try {
      const blob = await exportDashboardExcel({
        tahun: year,
        sertifikasi_id: sertifikasi,
        prodi_id: prodi,
      });

      const url = window.URL.createObjectURL(
        new Blob([blob])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `laporan-kompetensi-${Date.now()}.xlsx`
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (error) {
      console.error(error);
    }
  };

  const handleExportPdf = async () => {

    try {

      const blob = await exportDashboardPdf({
        tahun: year,
        sertifikasi_id: sertifikasi,
        prodi_id: prodi,
      });

      const url = window.URL.createObjectURL(
        new Blob([blob])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `laporan-kompetensi-${Date.now()}.pdf`
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (error) {
      console.error(error);
    }
  };


  const totalMahasiswa =
    summary?.total_mahasiswa || 0;

  const totalKompeten =
    summary?.kompeten || 0;

  const totalTidakKompeten =
    summary?.tidak_kompeten || 0;

  const totalTidakHadir =
    summary?.tidak_hadir || 0;

  const totalBelumDinilai =
    summary?.belum_dinilai || 0;

  const totalSudahDinilai =
    totalKompeten +
    totalTidakKompeten +
    totalTidakHadir;

  const tingkatKompetensi =
    totalSudahDinilai > 0
      ? (
        (totalKompeten / totalSudahDinilai) * 100
      ).toFixed(1)
      : 0;

  return (
    <div className="p-6 bg-gray-50 space-y-6 min-h-full flex flex-col">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Rekap Kompetensi Mahasiswa
        </h1>

        <p className="text-gray-500 mt-2">
          Monitoring real-time capaian kompetensi
          per program studi
        </p>
      </div>

      {/* FILTER + EXPORT */}
      <div className={cn(
        "flex flex-col xl:flex-row",
        "xl:items-end",
        "gap-4")}>

        <div className="flex-1">
          <FilterBar
            sertifikasiList={sertifikasiList}
            onChange={(year, prodi, sertifikasi) => {

              setYear(year);
              setProdi(prodi);
              setSertifikasi(sertifikasi);

              fetchDashboard(
                year,
                sertifikasi,
                prodi
              );
            }}
          />
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={handleExportExcel}
            className={cn(
              "flex items-center gap-2",
              "px-5 py-3 rounded-xl",
              "bg-emerald-600",
              "hover:bg-emerald-700",
              "shadow-sm hover:shadow-md",
              "text-white text-sm font-medium",
              "transition")}>

            <FaFileExcel className="text-lg" />
            Export Excel
          </button>

          <button
            onClick={handleExportPdf}
            className={cn(
              "flex items-center gap-2",
              "px-5 py-3 rounded-xl",
              "bg-red-600",
              "hover:bg-red-700",
              "text-white text-sm font-medium",
              "transition")}>

            <FaFilePdf className="text-lg" />
            Export PDF
          </button>
        </div>
      </div>

      <div className={cn(
        "grid grid-cols-1",
        "xl:grid-cols-4",
        "gap-6",
        "items-stretch flex-1")}>

        {/* LEFT SIDE */}
        <div className={cn(
          "xl:col-span-1",
          "space-y-5",
          "gap-5 flex flex-col")}>

          {/* TOTAL MAHASISWA */}
          <div className={cn(
            "bg-white rounded-3xl",
            "border border-gray-100",
            "p-6 shadow-sm",
            "flex-1 flex flex-col justify-between")}>

            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-sm font-medium">Total Mahasiswa</p>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <FaUsers className="text-indigo-700 text-xl" />
              </div>
            </div>

            <div className="flex-1 flex items-center justify-start my-4">
              <h2 className="text-6xl font-extrabold text-indigo-700">
                {totalMahasiswa}
              </h2>
            </div>

            <p className="text-sm text-emerald-600">
              ↗ +12% dari semester lalu
            </p>
          </div>

          {/* TINGKAT KOMPETENSI */}
          <div className={cn(
            "bg-white rounded-3xl",
            "border border-gray-100",
            "p-6 shadow-sm",
            "flex-1 flex flex-col justify-between")}>

            <div className={cn(
              "flex items-start",
              "justify-between")}>

              <div>
                <p className="text-gray-500 text-sm">
                  Tingkat Kompetensi
                </p>

                <h2 className={cn(
                  "text-5xl font-bold",
                  "text-emerald-700 mt-5")}>
                  {tingkatKompetensi}%
                </h2>

              </div>

              <div className={cn(
                "w-14 h-14 rounded-2xl",
                "bg-emerald-100",
                "flex items-center justify-center")}>
                <FaCheckCircle className={cn(
                  "text-emerald-700 text-2xl")} />
              </div>

            </div>

            {/* PROGRESS BAR */}
            <div className={cn(
              "w-full h-3 rounded-full",
              "bg-gray-100 mt-8",
              "overflow-hidden")}>

              <div
                className={cn(
                  "h-full rounded-full",
                  "bg-emerald-600"
                )}
                style={{
                  width: `${tingkatKompetensi}%`
                }}
              />

            </div>

          </div>

          {/* MENUNGGU UJIAN */}
          <div className={cn(
            "bg-white rounded-3xl",
            "border border-gray-100",
            "p-6 shadow-sm",
            "flex-1 flex flex-col justify-between")}>

            <div className={cn(
              "flex items-start",
              "justify-between")}>

              <div>

                <p className="text-gray-500 text-sm">
                  Belum Dinilai
                </p>

                <h2 className={cn(
                  "text-5xl font-bold",
                  "text-amber-700 mt-5")}>
                  {totalBelumDinilai}
                </h2>

              </div>

              <div className={cn(
                "w-14 h-14 rounded-2xl",
                "bg-amber-100",
                "flex items-center justify-center")}>

                <FaClipboard className={cn(
                  "text-amber-700 text-2xl")} />
              </div>

            </div>

            <p className={cn(
              "text-sm text-gray-500 mt-6")}>
              Daftar prodi aktif
            </p>
          </div>
        </div>

        <div className="xl:col-span-3 flex flex-col">
          <ChartSection data={data} />
        </div>
      </div>
    </div>
  );
}