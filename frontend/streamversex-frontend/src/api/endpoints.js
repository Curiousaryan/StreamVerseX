export const ENDPOINTS = {
  /* =====================================================
     AUTH
  ===================================================== */
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/api/auth/change-password",
    VERIFY_EMAIL: "/api/auth/verify-email",
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
    REMOVE: (id) => `/api/favorites/${id}`,
    CHECK: (id) => `/api/favorites/check/${id}`,
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
    UPLOAD_IMAGE: "/api/profile/image",
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
  /* =====================================================================
   PASTE THIS BLOCK INSIDE THE EXISTING `ENDPOINTS` OBJECT IN
   src/api/endpoints.js  (add it as a new top-level key, e.g. right
   after PAYMENTS, before the closing `};` of ENDPOINTS)
===================================================================== */

  /* =====================================================
     ADMIN — DASHBOARD
  ===================================================== */
  ADMIN_DASHBOARD_API: {
    OVERVIEW: "/api/admin/dashboard",
  },

  /* =====================================================
     ADMIN — USERS
  ===================================================== */
  ADMIN_USERS: {
    ALL: "/api/admin/users",
    DETAILS: (userId) => `/api/admin/users/${userId}`,
    SEARCH: "/api/admin/users/search",
    BLOCK: (userId) => `/api/admin/users/${userId}/block`,
    UNBLOCK: (userId) => `/api/admin/users/${userId}/unblock`,
  },

  /* =====================================================
     ADMIN — REVIEWS
  ===================================================== */
  ADMIN_REVIEWS: {
    ALL: "/api/admin/reviews",
    SEARCH: "/api/admin/reviews/search",
    DELETE: (reviewId) => `/api/admin/reviews/${reviewId}`,
  },

  /* =====================================================
     ADMIN — PREMIUM USERS
  ===================================================== */
  ADMIN_PREMIUM_USERS: {
    ALL: "/api/admin/premium-users",
    SEARCH: "/api/admin/premium-users/search",
    EXPIRING: "/api/admin/premium-users/expiring",
    EXPIRE: (userId) => `/api/admin/premium-users/${userId}/expire`,
  },

  /* =====================================================
     ADMIN — PAYMENTS
  ===================================================== */
  ADMIN_PAYMENTS: {
    ALL: "/api/admin/payments",
    DETAILS: (paymentId) => `/api/admin/payments/${paymentId}`,
    BY_STATUS: "/api/admin/payments/status",
    SEARCH: "/api/admin/payments/search",
  },

  /* =====================================================
     ADMIN — ANALYTICS
  ===================================================== */
  ADMIN_ANALYTICS: {
    USERS: "/api/admin/analytics/users",
    TOP_WATCHLIST: "/api/admin/analytics/top-watchlist",
    TOP_REVIEWED: "/api/admin/analytics/top-reviewed",
    TOP_FAVORITES: "/api/admin/analytics/top-favorites",
    REVENUE: "/api/admin/analytics/revenue",
    PAYMENTS: "/api/admin/analytics/payments",
    CONTENT: "/api/admin/analytics/content",
  },
};