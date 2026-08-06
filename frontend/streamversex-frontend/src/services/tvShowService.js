import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

/* ==========================================
    Trending TV Shows
========================================== */

export const getTrendingTvShows = async () => {
  const response = await axiosInstance.get(
    ENDPOINTS.TV.TRENDING
  );

  return response.data;
};

/* ==========================================
    Popular TV Shows
========================================== */

export const getPopularTvShows = async () => {
  const response = await axiosInstance.get(
    ENDPOINTS.TV.POPULAR
  );

  return response.data;
};

/* ==========================================
    Top Rated TV Shows
========================================== */

export const getTopRatedTvShows = async () => {
  const response = await axiosInstance.get(
    ENDPOINTS.TV.TOP_RATED
  );

  return response.data;
};

/* ==========================================
    On Air
========================================== */

export const getOnAirTvShows = async () => {
  const response = await axiosInstance.get(
    ENDPOINTS.TV.ON_AIR
  );

  return response.data;
};

/* ==========================================
    Airing Today
========================================== */

export const getAiringTodayTvShows =
  async () => {
    const response =
      await axiosInstance.get(
        ENDPOINTS.TV.AIRING_TODAY
      );

    return response.data;
  };

/* ==========================================
    Search TV
========================================== */

export const searchTvShows = async (
  query
) => {
  const response =
    await axiosInstance.get(
      ENDPOINTS.TV.SEARCH,
      {
        params: {
          query,
        },
      }
    );

  return response.data;
};

/* ==========================================
    Genres
========================================== */

export const getTvGenres = async () => {
  const response = await axiosInstance.get(
    ENDPOINTS.TV.GENRES
  );

  return response.data;
};

/* ==========================================
    Details
========================================== */

export const getTvDetails = async (
  id
) => {
  const response =
    await axiosInstance.get(
      ENDPOINTS.TV.DETAILS(id)
    );

  return response.data;
};

/* ==========================================
    Credits
========================================== */

export const getTvCredits = async (
  id
) => {
  const response =
    await axiosInstance.get(
      ENDPOINTS.TV.CREDITS(id)
    );

  return response.data;
};

/* ==========================================
    Videos
========================================== */

export const getTvVideos = async (
  id
) => {
  const response =
    await axiosInstance.get(
      ENDPOINTS.TV.VIDEOS(id)
    );

  return response.data;
};

/* ==========================================
    Recommendations
========================================== */

export const getTvRecommendations =
  async (id) => {
    const response =
      await axiosInstance.get(
        ENDPOINTS.TV.RECOMMENDATIONS(
          id
        )
      );

    return response.data;
  };