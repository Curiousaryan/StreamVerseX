import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroBanner from "../../components/user/home/HeroBanner";
import MediaRow from "../../components/user/home/MediaRow";

import palette from "../../theme/palette";

import {
  getTrendingAnime,
  getPopularAnime,
  getTopRatedAnime,
  getSeasonalAnime,
  getUpcomingAnime,
} from "../../services/animeService";

import { ROUTES } from "../../routes/routeConstants";

function Anime() {
  const navigate = useNavigate();

  /* ==========================================
      STATES
  ========================================== */

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [trendingAnime, setTrendingAnime] =
    useState([]);

  const [popularAnime, setPopularAnime] =
    useState([]);

  const [topRatedAnime, setTopRatedAnime] =
    useState([]);

  const [seasonalAnime, setSeasonalAnime] =
    useState([]);

  const [upcomingAnime, setUpcomingAnime] =
    useState([]);

  /* ==========================================
      LOAD ANIME
  ========================================== */

  const loadAnime = async () => {
    try {
      setLoading(true);

      setError("");

      const [
        trending,
        popular,
        topRated,
        seasonal,
        upcoming,
      ] = await Promise.all([
        getTrendingAnime(),
        getPopularAnime(),
        getTopRatedAnime(),
        getSeasonalAnime(),
        getUpcomingAnime(),
      ]);

      setTrendingAnime(trending);

      setPopularAnime(popular);

      setTopRatedAnime(topRated);

      setSeasonalAnime(seasonal);

      setUpcomingAnime(upcoming);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load anime."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnime();
  }, []);

  /* ==========================================
      HANDLERS
  ========================================== */

  const handleAnimeClick = (
    anime
  ) => {
    navigate(
      ROUTES.ANIME_DETAILS.replace(
        ":id",
        anime.id
      )
    );
  };

  const handleAddWatchlist = (
    anime
  ) => {
    console.log(anime);
  };

    /* ==========================================
      LOADING
  ========================================== */

  if (loading) {
    return (
      <main
        className="flex min-h-screen items-center justify-center"
        style={{
          backgroundColor:
            palette.background.default,
          color:
            palette.text.primary,
        }}
      >
        <h2 className="text-2xl font-semibold">
          Loading Anime...
        </h2>
      </main>
    );
  }

  /* ==========================================
      ERROR
  ========================================== */

  if (error) {
    return (
      <main
        className="flex min-h-screen items-center justify-center"
        style={{
          backgroundColor:
            palette.background.default,
        }}
      >
        <div className="text-center">

          <h2
            className="text-3xl font-bold"
            style={{
              color:
                palette.error.main,
            }}
          >
            Something Went Wrong
          </h2>

          <p
            className="mt-4"
            style={{
              color:
                palette.text.secondary,
            }}
          >
            {error}
          </p>

          <button
            onClick={loadAnime}
            className="mt-6 rounded-lg px-8 py-3 transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor:
                palette.primary.main,
              color:
                palette.text.primary,
            }}
          >
            Retry
          </button>

        </div>
      </main>
    );
  }

  /* ==========================================
      UI
  ========================================== */

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor:
          palette.background.default,
        color:
          palette.text.primary,
      }}
    >
      {/* Hero Banner */}

      <HeroBanner
        items={trendingAnime}
        onViewDetails={handleAnimeClick}
        onWatchlist={handleAddWatchlist}
      />

      {/* Anime Sections */}

      <section className="relative z-10 -mt-28 pb-20">

        <MediaRow
          title="Trending Anime"
          items={trendingAnime}
          onItemClick={handleAnimeClick}
          onAddWatchlist={handleAddWatchlist}
        />

        <MediaRow
          title="Popular Anime"
          items={popularAnime}
          onItemClick={handleAnimeClick}
          onAddWatchlist={handleAddWatchlist}
        />

        <MediaRow
          title="Top Rated Anime"
          items={topRatedAnime}
          onItemClick={handleAnimeClick}
          onAddWatchlist={handleAddWatchlist}
        />
        <MediaRow
          title="Seasonal Anime"
          items={seasonalAnime}
          onItemClick={handleAnimeClick}
          onAddWatchlist={handleAddWatchlist}
        />

        <MediaRow
          title="Upcoming Anime"
          items={upcomingAnime}
          onItemClick={handleAnimeClick}
          onAddWatchlist={handleAddWatchlist}
        />

      </section>

    </main>
  );
}

export default Anime;
