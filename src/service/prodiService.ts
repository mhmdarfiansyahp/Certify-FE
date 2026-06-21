import api from "../api/axios";
import type { Prodi } from "../types/prodi";

export const getProdi = async () => {
  const response = await api.get("/prodi");
  return response.data;
};

export const createProdi = async (payload: Prodi) => {
  const response = await api.post("/prodi", payload);
  return response.data;
};

export const updateProdi = async (id: number, payload: Prodi) => {
  const response = await api.put(`/prodi/${id}`, payload);
  return response.data;
};

export const deleteProdi = async (id: number) => {
  const response = await api.delete(`/prodi/${id}`);
  return response.data;
};