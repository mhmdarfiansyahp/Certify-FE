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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartSection({ data }: any) {

  const labels = data.map((d: any) => d.nama_sertifikasi);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Jumlah Sertifikasi",
        data: data.map(() => 1),
        backgroundColor: "#4382DF",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

      <div className="mb-5">
        <h2 className="font-semibold text-gray-800">
          Grafik Sertifikasi
        </h2>

        <p className="text-sm text-gray-500">
          Statistik keseluruhan sertifikasi
        </p>
      </div>

      <Bar data={chartData} options={options} />
    </div>
  );
}