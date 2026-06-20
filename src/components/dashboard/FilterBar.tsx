interface Props {
  onChange: (
    year: string,
    prodi: string,
    sertifikasi: string
  ) => void;
}

export default function FilterBar({ onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* TAHUN */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Tahun
        </label>

        <select
          className="
            w-full px-4 py-3 rounded-xl
            border border-gray-200
            bg-white
            text-sm
            outline-none
            focus:ring-2
            focus:ring-[#4382DF]
            transition
          "
          onChange={(e) => onChange(e.target.value, "", "")}
        >
          <option value="">Pilih Tahun</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {/* PRODI */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Program Studi
        </label>

        <select
          className="
            w-full px-4 py-3 rounded-xl
            border border-gray-200
            bg-white
            text-sm
            outline-none
            focus:ring-2
            focus:ring-[#4382DF]
            transition
          "
          onChange={(e) => onChange("", e.target.value, "")}
        >
          <option value="">Pilih Prodi</option>
          <option value="1">Informatika</option>
          <option value="2">Sistem Informasi</option>
        </select>
      </div>

      {/* SERTIFIKASI */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Sertifikasi
        </label>

        <select
          className="
            w-full px-4 py-3 rounded-xl
            border border-gray-200
            bg-white
            text-sm
            outline-none
            focus:ring-2
            focus:ring-[#4382DF]
            transition
          "
          onChange={(e) => onChange("", "", e.target.value)}
        >
          <option value="">Pilih Sertifikasi</option>
          <option value="1">Web Development</option>
          <option value="2">UI/UX Design</option>
        </select>
      </div>

    </div>
  );
}