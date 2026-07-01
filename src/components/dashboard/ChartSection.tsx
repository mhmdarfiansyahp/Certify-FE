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

import type { DashboardKompetensi } from "../../types/dashboard";

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

  const labels = data.map((d) => d.nama_prodi);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Kompeten",
        data: data.map((d) => d.kompeten),
        backgroundColor: "#22c55e",
        borderRadius: 6,
      },
      {
        label: "Tidak Kompeten",
        data: data.map((d) => d.tidak_kompeten),
        backgroundColor: "#ef4444",
        borderRadius: 6,
      },
      {
        label: "Tidak Hadir",
        data: data.map((d) => d.tidak_hadir),
        backgroundColor: "#f59e0b",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

      <div className="mb-5">
        <h2 className="font-semibold text-gray-800">
          Rekap Kompetensi Per Prodi
        </h2>

        <p className="text-sm text-gray-500">
          Statistik kompetensi mahasiswa berdasarkan prodi
        </p>
      </div>

      <Bar data={chartData} options={options} />
    </div>
  );
}