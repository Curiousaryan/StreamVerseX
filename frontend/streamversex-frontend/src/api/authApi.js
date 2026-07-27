import axiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  const response = await axiosInstance.post(
    "/api/auth/login",
    credentials
  );

  return response.data;
};