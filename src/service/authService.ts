import api from "../api/axios";
import type { LoginRequest } from "../types/auth";

export const login = async (payload: LoginRequest) => {
  const response = await api.post("/login", payload);

  return response.data;
};

export const me = async () => {
  const response = await api.get("/me");

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");

  return response.data;
};