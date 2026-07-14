import { useEffect, useState } from "react";

import { getProdi } from "../../service/prodiService";

interface Props {
  sertifikasiList: any[];

  onChange: (
    year: string,
    prodi: string,
    sertifikasi: string
  ) => void;
}

export default function FilterBar({ onChange, sertifikasiList }: Props) {

  const [year, setYear] = useState("");
  const [prodi, setProdi] = useState("");
  const [sertifikasi, setSertifikasi] = useState("");

  const [prodiList, setProdiList] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const prodiData = await getProdi();
      setProdiList(prodiData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    y: string,
    p: string,
    s: string
  ) => {
    onChange(y, p, s);
  };

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Tahun
        </label>

        <select
          value={year}
          onChange={(e) => {
            const value = e.target.value;
            setYear(value);
            handleChange(value, prodi, sertifikasi);
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-500 focus:outline-none">

          <option value="">Semua Tahun</option>
          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* PRODI */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Program Studi
        </label>
        <select
          value={prodi}
          onChange={(e) => {
            const value = e.target.value;
            setProdi(value);
            handleChange(year, value, sertifikasi);
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-500 focus:outline-none">
          <option value="">Semua Prodi</option>

          {prodiList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nama_prodi}
            </option>
          ))}
        </select>
      </div>

      {/* SERTIFIKASI */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Sertifikasi
        </label>

        <select
          value={sertifikasi}
          onChange={(e) => {
            const value = e.target.value;
            setSertifikasi(value);
            handleChange(year, prodi, value);
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-500 focus:outline-none">
          <option value="">Semua Sertifikasi</option>

          {sertifikasiList
            .filter((item) => item.status === true)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama_sertifikasi}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}