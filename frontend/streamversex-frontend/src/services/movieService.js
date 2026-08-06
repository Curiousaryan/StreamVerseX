import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

/* ===============================
   Trending Movies
================================ */

export const getTrendingMovies = async () => {
  const response = await axiosInstance.get(
    ENDPOINTS.MOVIES.TRENDING
  );

  return response.data;
};

/* ===============================
   Popular Movies
================================ */

export const getPopularMovies = async () => {
  const response = await axiosInstance.get(
    ENDPOINTS.MOVIES.POPULAR
  );

  return response.data;
};

/* ===============================
   Top Rated Movies
================================ */

export const getTopRatedMovies = async () => {
  const response = await axiosInstance.get(
    ENDPOINTS.MOVIES.TOP_RATED
  );

  return response.data;
};

/* ===============================
   Upcoming Movies
================================ */

export const getUpcomingMovies = async () => {
  const response = await axiosInstance.get(
    ENDPOINTS.MOVIES.UPCOMING
  );

  return response.data;
};

/* ===============================
   Now Playing Movies
================================ */

export const getNowPlayingMovies = async () => {
  const response = await axiosInstance.get(
    ENDPOINTS.MOVIES.NOW_PLAYING
  );

  return response.data;
};

/* ===============================
   Search Movies
================================ */

export const searchMovies = async (query) => {
  const response = await axiosInstance.get(
    ENDPOINTS.MOVIES.SEARCH,
    {
      params: {
        query,
      },
    }
  );

  return response.data;
};

/* ===============================
   Genres
================================ */

export const getMovieGenres = async () => {
  const response = await axiosInstance.get(
    ENDPOINTS.MOVIES.GENRES
  );

  return response.data;
};

/* ===============================
   Movie Details
================================ */

export const getMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(
    ENDPOINTS.MOVIES.DETAILS(movieId)
  );

  return response.data;
};

/* ===============================
   Credits
================================ */

export const getMovieCredits = async (movieId) => {
  const response = await axiosInstance.get(
    ENDPOINTS.MOVIES.CREDITS(movieId)
  );

  return response.data;
};

/* ===============================
   Videos
================================ */

export const getMovieVideos = async (movieId) => {
  const response = await axiosInstance.get(
    ENDPOINTS.MOVIES.VIDEOS(movieId)
  );

  return response.data;
};

/* ===============================
   Recommendations
================================ */

export const getMovieRecommendations = async (
  movieId
) => {
  const response = await axiosInstance.get(
    ENDPOINTS.MOVIES.RECOMMENDATIONS(movieId)
  );

  return response.data;
};