import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import type {
  DashboardKompetensi
} from "../../types/dashboard";
import { cn } from "../../utils/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: DashboardKompetensi[];
}

export default function ChartSection({ data }: Props) {

  const labels = data.map(
    (d) => d.nama_prodi
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Kompeten",

        data: data.map(
          (d) => d.kompeten
        ),

        backgroundColor: "#22c55e",
        borderRadius: 8,
        barThickness: 28,
      },

      {
        label: "Tidak Kompeten",

        data: data.map(
          (d) => d.tidak_kompeten
        ),

        backgroundColor: "#ef4444",
        borderRadius: 8,
        barThickness: 28,
      },

      {
        label: "Tidak Hadir",

        data: data.map(
          (d) => d.tidak_hadir
        ),

        backgroundColor: "#f59e0b",
        borderRadius: 8,
        barThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {

      legend: {
        position: "top" as const,

        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 12,
          },
        },
      },

      tooltip: {
        backgroundColor: "#111827",
        padding: 12,
        cornerRadius: 12,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#6b7280",
        },
        grid: {
          color: "#f1f5f9",
        },
      },
    },
  };

  return (
    <div
      className={cn(
        "bg-white rounded-3xl border border-gray-100 shadow-sm p-6 h-full flex flex-col"
      )}>
      <div className="mb-8">

        <h2 className={cn(
          "text-xl font-semibold",
          "text-gray-800")}>

          Rekap Kompetensi Per Prodi
        </h2>

        <p className={cn(
          "text-sm text-gray-500 mt-2")}>

          Statistik kompetensi mahasiswa
          berdasarkan program studi
        </p>

      </div>

      <div className="flex-1 w-full min-h-100">
        <Bar
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
}