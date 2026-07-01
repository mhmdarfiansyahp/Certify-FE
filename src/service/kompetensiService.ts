import api from "../api/axios";

export const getStatusKompetensi = async () => {
  const response = await api.get(
    "/mahasiswa/kompetensi"
  );

  return response.data;
};

export const downloadSertifikat = async (
  id: number
) => {
  return await api.get(
    `/mahasiswa/kompetensi/${id}/download`,
    {
      responseType: "blob",
    }
  );
};