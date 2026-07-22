export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  MOVIES: {
    ALL: "/movies",
    TRENDING: "/movies/trending",
    DETAILS: (id) => `/movies/${id}`,
  },

  PROFILE: {
    ME: "/profile/me",
    UPDATE: "/profile",
  },
};