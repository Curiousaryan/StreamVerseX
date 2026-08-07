import { searchMovies } from "./movieService";
import { searchTvShows } from "./tvShowService";
import { searchAnime } from "./animeService";

import { normalizeMovie, normalizeTv } from "./homeService";

/**
 * Global Search Service
 * ---------------------------------------
 * Searches Movies, TV Shows and Anime
 * in parallel.
 *
 * Returns:
 * {
 *   movies: [],
 *   tv: [],
 *   anime: [],
 *   all: []
 * }
 */

export const searchAll = async (query) => {
  const trimmed = (query || "").trim();

  const emptyResponse = {
    movies: [],
    tv: [],
    anime: [],
    all: [],
  };

  if (!trimmed) return emptyResponse;

  try {
    const [movieResult, tvResult, animeResult] =
      await Promise.allSettled([
        searchMovies(trimmed),
        searchTvShows(trimmed),
        searchAnime(trimmed),
      ]);

    const movies =
      movieResult.status === "fulfilled"
        ? (movieResult.value || []).map(normalizeMovie)
        : [];

    const tv =
      tvResult.status === "fulfilled"
        ? (tvResult.value || []).map(normalizeTv)
        : [];

    // animeService already returns normalized objects
    const anime =
      animeResult.status === "fulfilled"
        ? animeResult.value || []
        : [];

    // Merge all results
    const merged = [...movies, ...tv, ...anime];

    // Remove duplicates
    const unique = [
      ...new Map(
        merged.map((item) => [
          `${item.mediaType}-${item.id}`,
          item,
        ])
      ).values(),
    ];

    // Highest rated first
    unique.sort(
      (a, b) => (b.rating || 0) - (a.rating || 0)
    );

    return {
      movies,
      tv,
      anime,
      all: unique,
    };
  } catch (error) {
    console.error("Global Search Error:", error);
    return emptyResponse;
  }
};

export default {
  searchAll,
};