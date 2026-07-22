import api from "../api/axios";
import type {
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../types/auth";

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

export const forgotPassword = async (payload: ForgotPasswordRequest) => {
  const response = await api.post("/forgot-password", payload);

  return response.data;
};

export const resetPassword = async (payload: ResetPasswordRequest) => {
  const response = await api.post("/reset-password", payload);

  
  return response.data;
};
