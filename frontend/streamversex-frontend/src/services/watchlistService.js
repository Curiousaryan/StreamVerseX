import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

// ========================================
// Get User Watchlist
// ========================================

export const getWatchlist = async () => {
  const response = await axiosInstance.get(ENDPOINTS.WATCHLIST.ALL);
  return response.data;
};

// ========================================
// Add To Watchlist
// ========================================

export const addToWatchlist = async ({ contentId, contentType }) => {
  const response = await axiosInstance.post(ENDPOINTS.WATCHLIST.ADD, {
    // Coerce defensively — TMDB/AniList ids are numeric, but if an id ever
    // arrives as a string (e.g. pulled from a URL param) a Java backend
    // expecting a Long will 400 on a JSON string instead of a number.
    contentId: Number(contentId),
    contentType,
  });

  return response.data;
};

// ========================================
// Remove From Watchlist
// ========================================

export const removeFromWatchlist = async (contentType, contentId) => {
  const response = await axiosInstance.delete(
    `${ENDPOINTS.WATCHLIST.ALL}/${contentType}/${Number(contentId)}`
  );

  return response.data;
};

// ========================================
// Check Watchlist
// ========================================

export const checkWatchlist = async (contentType, contentId) => {
  const response = await axiosInstance.get(
    `${ENDPOINTS.WATCHLIST.ALL}/check/${contentType}/${Number(contentId)}`
  );

  return response.data;
};

// ========================================
// Update Watch Status
// ========================================

export const updateWatchStatus = async (contentType, contentId, status) => {
  const response = await axiosInstance.put(
    `${ENDPOINTS.WATCHLIST.ALL}/${contentType}/${Number(contentId)}/status`,
    null,
    { params: { status } }
  );

  return response.data;
};