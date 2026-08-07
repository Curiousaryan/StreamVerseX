import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

/* ==========================================
    Normalize Anime
========================================== */

const normalizeAnime = (anime) => ({
  id: anime.id,

  title: anime.title || anime.englishTitle,

  description: anime.description,

  poster: anime.coverImageUrl,

  backdrop:
    anime.bannerImageUrl ||
    anime.coverImageUrl,

  rating:
    anime.averageScore
      ? anime.averageScore / 10
      : null,

  year:
    anime.startDate?.split("-")[0] || "",

  genres:
    anime.genres || [],

  mediaType: "Anime",
});

/* ==========================================
    Trending Anime
========================================== */

export const getTrendingAnime =
  async () => {
    const response =
      await axiosInstance.get(
        ENDPOINTS.ANIME.TRENDING
      );

    return response.data.map(
      normalizeAnime
    );
  };

/* ==========================================
    Popular Anime
========================================== */

export const getPopularAnime =
  async () => {
    const response =
      await axiosInstance.get(
        ENDPOINTS.ANIME.POPULAR
      );

    return response.data.map(
      normalizeAnime
    );
  };

/* ==========================================
    Top Rated Anime
========================================== */

export const getTopRatedAnime =
  async () => {
    const response =
      await axiosInstance.get(
        ENDPOINTS.ANIME.TOP_RATED
      );

    return response.data.map(
      normalizeAnime
    );
  };

  /* ==========================================
    Seasonal Anime
========================================== */

export const getSeasonalAnime =
  async (
    season = "SUMMER",
    year = new Date().getFullYear()
  ) => {
    const response =
      await axiosInstance.get(
        ENDPOINTS.ANIME.SEASONAL,
        {
          params: {
            season,
            year,
          },
        }
      );

    return response.data.map(
      normalizeAnime
    );
  };

/* ==========================================
    Upcoming Anime
========================================== */

export const getUpcomingAnime =
  async () => {
    const response =
      await axiosInstance.get(
        ENDPOINTS.ANIME.UPCOMING
      );

    return response.data.map(
      normalizeAnime
    );
  };

  /* ==========================================
    Search Anime
========================================== */

export const searchAnime =
  async (query) => {
    const response =
      await axiosInstance.get(
        ENDPOINTS.ANIME.SEARCH,
        {
          params: {
            query,
          },
        }
      );

    return response.data.map(
      normalizeAnime
    );
  };

  /* ==========================================
    Anime Details
========================================== */

export const getAnimeDetails =
  async (id) => {
    const response =
      await axiosInstance.get(
        ENDPOINTS.ANIME.DETAILS(id)
      );

    return response.data;
  };

/* ==========================================
    Characters
========================================== */

export const getAnimeCharacters =
  async (id) => {
    const response =
      await axiosInstance.get(
        ENDPOINTS.ANIME.CHARACTERS(id)
      );

    return response.data;
  };

/* ==========================================
    Recommendations
========================================== */

export const getAnimeRecommendations =
  async (id) => {
    const response =
      await axiosInstance.get(
        ENDPOINTS.ANIME.RECOMMENDATIONS(id)
      );

    return response.data;
  };