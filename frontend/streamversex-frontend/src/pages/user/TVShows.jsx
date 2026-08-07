import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroBanner from "../../components/user/home/HeroBanner";
import MediaRow from "../../components/user/home/MediaRow";
import TrailerModal from "../../components/common/TrailerModal";

import palette from "../../theme/palette";

import {
  getTrendingTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  getOnAirTvShows,
  getAiringTodayTvShows,
} from "../../services/tvShowService";

import { normalizeTv } from "../../services/homeService";
import { getTrailerKeyForItem } from "../../services/trailerService";

import { ROUTES } from "../../routes/routeConstants";

function TVShows() {
  const navigate = useNavigate();

  /* ==========================================
      STATES
  ========================================== */

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [trendingTv, setTrendingTv] =
    useState([]);

  const [popularTv, setPopularTv] =
    useState([]);

  const [topRatedTv, setTopRatedTv] =
    useState([]);

  const [onAirTv, setOnAirTv] =
    useState([]);

  const [airingTodayTv, setAiringTodayTv] =
    useState([]);

  /* ==========================================
      LOAD TV SHOWS
  ========================================== */

  const loadTvShows = async () => {
    try {
      setLoading(true);

      setError("");

      const [
        trending,
        popular,
        topRated,
        onAir,
        airingToday,
      ] = await Promise.all([
        getTrendingTvShows(),
        getPopularTvShows(),
        getTopRatedTvShows(),
        getOnAirTvShows(),
        getAiringTodayTvShows(),
      ]);

      setTrendingTv(trending.map(normalizeTv));

      setPopularTv(popular.map(normalizeTv));

      setTopRatedTv(topRated.map(normalizeTv));

      setOnAirTv(onAir.map(normalizeTv));

      setAiringTodayTv(airingToday.map(normalizeTv));
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load TV Shows."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTvShows();
  }, []);

  /* ==========================================
      HANDLERS
  ========================================== */

  const handleTvClick = (tv) => {
    navigate(
      ROUTES.TV_DETAILS.replace(
        ":id",
        tv.id
      )
    );
  };

  const handleAddWatchlist = (
    tv
  ) => {
    console.log(tv);
  };

  /* ==========================================
      TRAILER MODAL
  ========================================== */

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerTitle, setTrailerTitle] = useState("");

  const handlePlay = async (tv) => {
    setTrailerTitle(tv.title);
    setTrailerOpen(true);
    setTrailerLoading(true);
    setTrailerKey(null);

    const key = await getTrailerKeyForItem(tv);

    setTrailerKey(key);
    setTrailerLoading(false);
  };

  const closeTrailer = () => {
    setTrailerOpen(false);
    setTrailerKey(null);
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
          Loading TV Shows...
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
            onClick={loadTvShows}
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
        items={trendingTv}
        onViewDetails={handleTvClick}
        onWatchlist={handleAddWatchlist}
        onPlay={handlePlay}
      />

      {/* TV Sections */}

      <section className="relative z-10 -mt-8 pb-20">

        <MediaRow
          title="Trending TV Shows"
          items={trendingTv}
          onItemClick={handleTvClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
        />

        <MediaRow
          title="Popular TV Shows"
          items={popularTv}
          onItemClick={handleTvClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
        />

        <MediaRow
          title="Top Rated TV Shows"
          items={topRatedTv}
          onItemClick={handleTvClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
        />
        <MediaRow
          title="Currently On Air"
          items={onAirTv}
          onItemClick={handleTvClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
        />

        <MediaRow
          title="Airing Today"
          items={airingTodayTv}
          onItemClick={handleTvClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
        />

      </section>

      <TrailerModal
        open={trailerOpen}
        onClose={closeTrailer}
        title={trailerTitle}
        trailerKey={trailerKey}
        loading={trailerLoading}
      />

    </main>
  );
}

export default TVShows;