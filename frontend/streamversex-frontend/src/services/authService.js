// src/services/authService.js
import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const unwrap = (res) => res.data;

export const login = (payload) =>
  axiosInstance.post(ENDPOINTS.AUTH.LOGIN, payload).then(unwrap);

export const register = (payload) =>
  axiosInstance.post(ENDPOINTS.AUTH.REGISTER, payload).then(unwrap);

export const forgotPassword = (payload) =>
  axiosInstance.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, payload).then(unwrap);

export const resetPassword = (payload) =>
  axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, payload).then(unwrap);

export const changePassword = (payload) =>
  axiosInstance.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, payload).then(unwrap);

export const verifyEmail = (params) =>
  axiosInstance.get(ENDPOINTS.AUTH.VERIFY_EMAIL, { params }).then(unwrap);

const authService = {
  login,
  register,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
};
export default authService; 