interface Props {
  data: any;
  onClose: () => void;
}

export default function DetailModal({
  data,
  onClose,
}: Props) {

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40 backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
    >

      <div
        className="
          bg-white
          w-full max-w-lg
          rounded-3xl
          shadow-2xl
          overflow-hidden
          animate-in fade-in zoom-in
        "
      >

        {/* HEADER */}
        <div
          className="
            px-6 py-5
            border-b border-gray-100
            flex items-center justify-between
          "
        >

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Detail Sertifikasi
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Informasi detail peserta sertifikasi
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              w-9 h-9 rounded-full
              hover:bg-gray-100
              transition
            "
          >
            ✕
          </button>

        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* KOMPETEN */}
            <div
              className="
                rounded-2xl
                bg-emerald-50
                border border-emerald-100
                p-4
              "
            >
              <p className="text-sm text-emerald-700">
                Kompeten
              </p>

              <h3 className="text-2xl font-bold text-emerald-800 mt-2">
                {data.kompeten || 0}
              </h3>
            </div>

            {/* TIDAK KOMPETEN */}
            <div
              className="
                rounded-2xl
                bg-red-50
                border border-red-100
                p-4
              "
            >
              <p className="text-sm text-red-700">
                Tidak Kompeten
              </p>

              <h3 className="text-2xl font-bold text-red-800 mt-2">
                {data.tidakkompeten || 0}
              </h3>
            </div>

            {/* TIDAK HADIR */}
            <div
              className="
                rounded-2xl
                bg-amber-50
                border border-amber-100
                p-4
              "
            >
              <p className="text-sm text-amber-700">
                Tidak Hadir
              </p>

              <h3 className="text-2xl font-bold text-amber-800 mt-2">
                {data.tidakhadir || 0}
              </h3>
            </div>

          </div>

          {/* EXTRA INFO */}
          <div
            className="
              rounded-2xl
              border border-gray-100
              bg-gray-50
              p-4
            "
          >
            <p className="text-sm text-gray-500">
              Sertifikasi
            </p>

            <h3 className="font-semibold text-gray-800 mt-1">
              {data.nama_sertifikasi}
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">

              <div>
                <p className="text-gray-500">Lembaga</p>
                <p className="font-medium text-gray-700 mt-1">
                  {data.lembaga}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Level</p>
                <p className="font-medium text-gray-700 mt-1">
                  {data.level}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div
          className="
            px-6 py-4
            border-t border-gray-100
            flex justify-end
          "
        >

          <button
            onClick={onClose}
            className="
              px-5 py-2.5 rounded-xl
              bg-[#4647AE]
              hover:bg-[#3d3ea0]
              text-white
              transition
            "
          >
            Tutup
          </button>

        </div>

      </div>
    </div>
  );
}