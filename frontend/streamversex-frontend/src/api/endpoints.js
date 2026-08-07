export const ENDPOINTS = {
  /* =====================================================
     AUTH
  ===================================================== */
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  /* =====================================================
     MOVIES
  ===================================================== */
  MOVIES: {
    TRENDING: "/api/movies/trending",
    POPULAR: "/api/movies/popular",
    TOP_RATED: "/api/movies/top-rated",
    UPCOMING: "/api/movies/upcoming",
    NOW_PLAYING: "/api/movies/now-playing",

    SEARCH: "/api/movies/search",
    GENRES: "/api/movies/genres",

    DETAILS: (id) => `/api/movies/${id}`,
    CREDITS: (id) => `/api/movies/${id}/credits`,
    VIDEOS: (id) => `/api/movies/${id}/videos`,
    RECOMMENDATIONS: (id) =>
      `/api/movies/${id}/recommendations`,
  },

  /* =====================================================
     TV SHOWS
  ===================================================== */
  TV: {
    TRENDING: "/api/tv/trending",
    POPULAR: "/api/tv/popular",
    TOP_RATED: "/api/tv/top-rated",
    ON_AIR: "/api/tv/on-air",
    AIRING_TODAY: "/api/tv/airing-today",

    SEARCH: "/api/tv/search",
    GENRES: "/api/tv/genres",

    DETAILS: (id) => `/api/tv/${id}`,
    CREDITS: (id) => `/api/tv/${id}/credits`,
    VIDEOS: (id) => `/api/tv/${id}/videos`,
    RECOMMENDATIONS: (id) =>
      `/api/tv/${id}/recommendations`,
  },

  /* =====================================================
     ANIME
  ===================================================== */
  ANIME: {
    TRENDING: "/api/anime/trending",
    POPULAR: "/api/anime/popular",
    TOP_RATED: "/api/anime/top-rated",
    SEASONAL: "/api/anime/seasonal",
    UPCOMING: "/api/anime/upcoming",

    SEARCH: "/api/anime/search",

    DETAILS: (id) => `/api/anime/${id}`,
    CHARACTERS: (id) =>
      `/api/anime/${id}/characters`,
    RECOMMENDATIONS: (id) =>
      `/api/anime/${id}/recommendations`,
  },

  /* =====================================================
     FAVORITES
  ===================================================== */
  FAVORITES: {
    ALL: "/api/favorites",
    ADD: "/api/favorites",
    REMOVE: (contentType, contentId) =>
      `/api/favorites/${contentType}/${contentId}`,
    CHECK: (contentType, contentId) =>
      `/api/favorites/check/${contentType}/${contentId}`,
  },

  /* =====================================================
     WATCHLIST
  ===================================================== */
  WATCHLIST: {
    ALL: "/api/watchlist",
    ADD: "/api/watchlist",
    UPDATE_STATUS: (id) =>
      `/api/watchlist/${id}`,
    REMOVE: (id) => `/api/watchlist/${id}`,
    CHECK: (id) =>
      `/api/watchlist/check/${id}`,
  },

  /* =====================================================
     REVIEWS
  ===================================================== */
  REVIEWS: {
    ALL: "/api/reviews",
    MY_REVIEWS: "/api/reviews/me",
    DETAILS: (id) => `/api/reviews/${id}`,
  },

  /* =====================================================
     PROFILE
  ===================================================== */
  PROFILE: {
    ME: "/api/profile/me",
    UPDATE: "/api/profile",
  },

  /* =====================================================
     NOTIFICATIONS
  ===================================================== */
  NOTIFICATIONS: {
    ALL: "/api/notifications",
    READ: (id) => `/api/notifications/${id}/read`,
  },

  /* =====================================================
     SUBSCRIPTIONS
  ===================================================== */
  SUBSCRIPTIONS: {
    PLANS: "/api/subscriptions/plans",
    CURRENT: "/api/subscriptions/current",
    PURCHASE: "/api/subscriptions/purchase",
  },

  /* =====================================================
     PAYMENTS
  ===================================================== */
  PAYMENTS: {
    HISTORY: "/api/payments",
    DETAILS: (id) => `/api/payments/${id}`,
  },
};