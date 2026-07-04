import api from "../api/axios";
import type { User } from "../types/user";

export const getUser = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (payload: User) => {
  const response = await api.post("/users", payload);
  return response.data;
};

export const updateUser = async (id: number, payload: User) => {
  const response = await api.put(`/users/${id}`, payload);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/profile");

  return response.data.data;
};

export const updateProfile = async (
  payload: Partial<User>
) => {
  const response = await api.put(
    "/profile",
    payload
  );

  return response.data;
};