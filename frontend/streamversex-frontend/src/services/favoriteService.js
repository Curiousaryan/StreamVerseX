import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

/* ==========================================
    Frontend mediaType ("Movie" | "TV" | "Anime")
    <-> backend ContentType enum (MOVIE | TV | ANIME)
========================================== */

const toContentType = (mediaType) => {
  if (mediaType === "Movie") return "MOVIE";
  if (mediaType === "TV") return "TV";
  if (mediaType === "Anime") return "ANIME";
  return mediaType;
};

const fromContentType = (contentType) => {
  if (contentType === "MOVIE") return "Movie";
  if (contentType === "TV") return "TV";
  if (contentType === "ANIME") return "Anime";
  return contentType;
};

/* ==========================================
    Get All Favorites
========================================== */

export const getFavorites = async () => {
  const response = await axiosInstance.get(ENDPOINTS.FAVORITES.ALL);

  return (response.data || []).map((fav) => ({
    id: fav.contentId,
    favoriteId: fav.id,
    title: fav.title,
    poster: fav.posterUrl,
    mediaType: fromContentType(fav.contentType),
    createdAt: fav.createdAt,
  }));
};

/* ==========================================
    Add Favorite
    item: normalized card item
    { id, title, poster, mediaType }
========================================== */

export const addFavorite = async (item) => {
  const response = await axiosInstance.post(ENDPOINTS.FAVORITES.ADD, {
    contentType: toContentType(item.mediaType),
    contentId: item.id,
    title: item.title,
    posterUrl: item.poster,
  });

  return response.data;
};

/* ==========================================
    Remove Favorite
========================================== */

export const removeFavorite = async (mediaType, contentId) => {
  await axiosInstance.delete(
    ENDPOINTS.FAVORITES.REMOVE(toContentType(mediaType), contentId)
  );
};

/* ==========================================
    Check Favorite
========================================== */

export const checkFavorite = async (mediaType, contentId) => {
  const response = await axiosInstance.get(
    ENDPOINTS.FAVORITES.CHECK(toContentType(mediaType), contentId)
  );

  return response.data?.favorite ?? false;
};
