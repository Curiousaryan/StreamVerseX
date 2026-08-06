import axiosInstance from "../api/axiosInstance";

export const normalizeMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  description: movie.overview,
  poster: movie.posterUrl,
  backdrop: movie.backdropUrl,
  rating: movie.rating,
  year: movie.releaseDate?.split("-")[0] || "",
  genres: movie.genreIds || [],
  mediaType: "Movie",
});

export const normalizeTv = (tv) => ({
  id: tv.id,
  title: tv.name,
  description: tv.overview,
  poster: tv.posterUrl,
  backdrop: tv.backdropUrl,
  rating: tv.rating,
  year: tv.firstAirDate?.split("-")[0] || "",
  genres: tv.genreIds || [],
  mediaType: "TV",
});

export const normalizeAnime = (anime) => ({
  id: anime.id,
  title: anime.title || anime.englishTitle,
  description: anime.description,
  poster: anime.coverImageUrl,
  backdrop: anime.bannerImageUrl || anime.coverImageUrl,
  rating: anime.averageScore / 10,
  year: "",
  genres: anime.genres || [],
  mediaType: "Anime",
});

export const getHomePageData = async () => {
  const [
    trendingMovies,
    popularMovies,
    topRatedMovies,

    trendingTv,
    popularTv,

    trendingAnime,
    popularAnime,
  ] = await Promise.all([
    axiosInstance.get("/api/movies/trending"),
    axiosInstance.get("/api/movies/popular"),
    axiosInstance.get("/api/movies/top-rated"),

    axiosInstance.get("/api/tv/trending"),
    axiosInstance.get("/api/tv/popular"),

    axiosInstance.get("/api/anime/trending"),
    axiosInstance.get("/api/anime/popular"),
  ]);

  return {
    trendingMovies: trendingMovies.data.map(normalizeMovie),
    popularMovies: popularMovies.data.map(normalizeMovie),
    topRatedMovies: topRatedMovies.data.map(normalizeMovie),

    trendingTv: trendingTv.data.map(normalizeTv),
    popularTv: popularTv.data.map(normalizeTv),

    trendingAnime: trendingAnime.data.map(normalizeAnime),
    popularAnime: popularAnime.data.map(normalizeAnime),
  };
};