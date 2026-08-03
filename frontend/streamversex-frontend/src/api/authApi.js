import axiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  const response = await axiosInstance.post(
    "/api/auth/login",
    credentials
  );

  return response.data;
};

export const register = async (payload) => {
  const response = await axiosInstance.post(
    "/api/auth/register",
    payload
  );

  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axiosInstance.post(
    "/api/auth/forgot-password",
    { email }
  );

  return response.data;
};

export const resetPassword = async ({ token, password }) => {
  const response = await axiosInstance.post(
    "/api/auth/reset-password",
    { token, password }
  );

  return response.data;
};

export const verifyEmail = async (token) => {
  const response = await axiosInstance.get(
    "/api/auth/verify-email",
    { params: { token } }
  );

  return response.data;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const response = await axiosInstance.post(
    "/api/auth/change-password",
    { currentPassword, newPassword }
  );

  return response.data;
};