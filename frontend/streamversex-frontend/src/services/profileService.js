// src/services/profileService.js
import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const unwrap = (res) => res.data;

export const getProfile = () =>
  axiosInstance.get(ENDPOINTS.PROFILE.ME).then(unwrap);

export const updateProfile = (payload) =>
  axiosInstance.put(ENDPOINTS.PROFILE.UPDATE, payload).then(unwrap);

export const uploadProfileImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosInstance
    .post(ENDPOINTS.PROFILE.UPLOAD_IMAGE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(unwrap);
};

const profileService = { getProfile, updateProfile, uploadProfileImage };
export default profileService;