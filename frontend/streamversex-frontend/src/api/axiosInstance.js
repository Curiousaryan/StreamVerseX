import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",

  headers: {
    "Content-Type": "application/json",
  },

  // NOTE: this was previously "100000000000" (≈3170 years) — a typo that
  // meant a hung/unreachable backend would never time out and the UI would
  // just spin forever instead of failing fast.
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

/**
 * Centralized response handling so every service (watchlist, movies, tv,
 * anime, etc.) gets consistent, readable error messages instead of each
 * caller having to dig through error.response.data itself.
 */
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      // Network error, backend unreachable, CORS failure, timeout, etc.
      error.friendlyMessage =
        "Unable to reach the server. Check your connection and that the backend is running.";
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // Session expired / not authenticated — clear stale token so the app
    // doesn't keep retrying authenticated requests that will always fail.
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      error.friendlyMessage = "Your session has expired. Please sign in again.";
      return Promise.reject(error);
    }

    error.friendlyMessage =
      (typeof data === "string" && data) ||
      data?.message ||
      data?.error ||
      `Request failed (${status}).`;

    return Promise.reject(error);
  }
);

export default axiosInstance;