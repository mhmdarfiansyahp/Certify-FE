import api from "../api/axios";
import type { Sertifikasi } from "../types/sertifikasi";

export const getSertifikasi = async () => {
  const res = await api.get("/sertifikasi");
  return res.data;
};

export const createSertifikasi = async (data: Sertifikasi) => {
  return await api.post("/sertifikasi", data);
};

export const updateSertifikasi = async (id: number, data: Sertifikasi) => {
  return await api.put(`/sertifikasi/${id}`, data);
};

export const deleteSertifikasi = async (id: number) => {
  return await api.delete(`/sertifikasi/${id}`);
};

export const getSertifikasiProdi = async () => {
  const response = await api.get("/instruktur/sertifikasi");

  return response.data;
};
