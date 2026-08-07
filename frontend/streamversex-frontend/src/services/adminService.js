// src/services/adminService.js
//
// Single source of truth for every /api/admin/* call.
// Pages/components never call axiosInstance directly — they call
// these functions, so if a backend contract changes you fix it here once.

import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const unwrap = (res) => res.data;

/* =====================================================
   DASHBOARD
===================================================== */
export const getAdminDashboard = () =>
  axiosInstance.get(ENDPOINTS.ADMIN_DASHBOARD_API.OVERVIEW).then(unwrap);

/* =====================================================
   USERS
===================================================== */
export const getAllUsers = (params) =>
  axiosInstance.get(ENDPOINTS.ADMIN_USERS.ALL, { params }).then(unwrap);

export const getUserById = (userId) =>
  axiosInstance.get(ENDPOINTS.ADMIN_USERS.DETAILS(userId)).then(unwrap);

export const searchUsers = (query, params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_USERS.SEARCH, { params: { query, ...params } })
    .then(unwrap);

export const blockUser = (userId) =>
  axiosInstance.patch(ENDPOINTS.ADMIN_USERS.BLOCK(userId)).then(unwrap);

export const unblockUser = (userId) =>
  axiosInstance.patch(ENDPOINTS.ADMIN_USERS.UNBLOCK(userId)).then(unwrap);

/* =====================================================
   REVIEWS
===================================================== */
export const getAllReviews = (params) =>
  axiosInstance.get(ENDPOINTS.ADMIN_REVIEWS.ALL, { params }).then(unwrap);

export const searchReviews = (query, params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_REVIEWS.SEARCH, { params: { query, ...params } })
    .then(unwrap);

export const deleteReview = (reviewId) =>
  axiosInstance.delete(ENDPOINTS.ADMIN_REVIEWS.DELETE(reviewId)).then(unwrap);

/* =====================================================
   PREMIUM USERS
===================================================== */
export const getPremiumUsers = (params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_PREMIUM_USERS.ALL, { params })
    .then(unwrap);

export const searchPremiumUsers = (query, params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_PREMIUM_USERS.SEARCH, {
      params: { query, ...params },
    })
    .then(unwrap);

export const getExpiringPremiumUsers = (params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_PREMIUM_USERS.EXPIRING, { params })
    .then(unwrap);

export const expirePremiumUser = (userId) =>
  axiosInstance
    .patch(ENDPOINTS.ADMIN_PREMIUM_USERS.EXPIRE(userId))
    .then(unwrap);

/* =====================================================
   PAYMENTS
===================================================== */
export const getAllPayments = (params) =>
  axiosInstance.get(ENDPOINTS.ADMIN_PAYMENTS.ALL, { params }).then(unwrap);

export const getPaymentById = (paymentId) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_PAYMENTS.DETAILS(paymentId))
    .then(unwrap);

export const getPaymentsByStatus = (status, params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_PAYMENTS.BY_STATUS, { params: { status, ...params } })
    .then(unwrap);

export const searchPayments = (query, params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_PAYMENTS.SEARCH, { params: { query, ...params } })
    .then(unwrap);

/* =====================================================
   ANALYTICS
===================================================== */
export const getUserAnalytics = (params) =>
  axiosInstance.get(ENDPOINTS.ADMIN_ANALYTICS.USERS, { params }).then(unwrap);

export const getTopWatchlisted = (params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_ANALYTICS.TOP_WATCHLIST, { params })
    .then(unwrap);

export const getTopReviewed = (params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_ANALYTICS.TOP_REVIEWED, { params })
    .then(unwrap);

export const getTopFavorites = (params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_ANALYTICS.TOP_FAVORITES, { params })
    .then(unwrap);

export const getRevenueAnalytics = (params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_ANALYTICS.REVENUE, { params })
    .then(unwrap);

export const getPaymentAnalytics = (params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_ANALYTICS.PAYMENTS, { params })
    .then(unwrap);

export const getContentAnalytics = (params) =>
  axiosInstance
    .get(ENDPOINTS.ADMIN_ANALYTICS.CONTENT, { params })
    .then(unwrap);

/* =====================================================
   Grouped default export (optional convenience)
===================================================== */
const adminService = {
  getAdminDashboard,
  getAllUsers,
  getUserById,
  searchUsers,
  blockUser,
  unblockUser,
  getAllReviews,
  searchReviews,
  deleteReview,
  getPremiumUsers,
  searchPremiumUsers,
  getExpiringPremiumUsers,
  expirePremiumUser,
  getAllPayments,
  getPaymentById,
  getPaymentsByStatus,
  searchPayments,
  getUserAnalytics,
  getTopWatchlisted,
  getTopReviewed,
  getTopFavorites,
  getRevenueAnalytics,
  getPaymentAnalytics,
  getContentAnalytics,
};

export default adminService;