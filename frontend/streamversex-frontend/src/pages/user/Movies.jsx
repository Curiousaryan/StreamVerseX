import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroBanner from "../../components/user/home/HeroBanner";
import MediaRow from "../../components/user/home/MediaRow";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from "../../services/movieService";

import { ROUTES } from "../../routes/routeConstants";

import palette from "../../theme/palette";

function Movies() {
  const navigate = useNavigate();

  /* ============================================
      STATES
  ============================================ */

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [trendingMovies, setTrendingMovies] =
    useState([]);

  const [popularMovies, setPopularMovies] =
    useState([]);

  const [topRatedMovies, setTopRatedMovies] =
    useState([]);

  const [upcomingMovies, setUpcomingMovies] =
    useState([]);

  const [nowPlayingMovies, setNowPlayingMovies] =
    useState([]);

  /* ============================================
      LOAD MOVIES
  ============================================ */

  const loadMovies = async () => {
    try {
      setLoading(true);

      setError("");

      const [
        trending,
        popular,
        topRated,
        upcoming,
        nowPlaying,
      ] = await Promise.all([
        getTrendingMovies(),
        getPopularMovies(),
        getTopRatedMovies(),
        getUpcomingMovies(),
        getNowPlayingMovies(),
      ]);

      setTrendingMovies(trending);

      setPopularMovies(popular);

      setTopRatedMovies(topRated);

      setUpcomingMovies(upcoming);

      setNowPlayingMovies(nowPlaying);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load movies."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  /* ============================================
      HANDLERS
  ============================================ */

  const handleMovieClick = (movie) => {
    navigate(
      ROUTES.MOVIE_DETAILS.replace(
        ":id",
        movie.id
      )
    );
  };

  const handleAddWatchlist = (movie) => {
    console.log(movie);
  };

    /* ============================================
      LOADING
  ============================================ */

  if (loading) {
    return (
      <main
        className="flex min-h-screen items-center justify-center"
        style={{
          backgroundColor:
            palette.background.default,
          color: palette.text.primary,
        }}
      >
        <h2 className="text-2xl font-semibold">
          Loading Movies...
        </h2>
      </main>
    );
  }

  /* ============================================
      ERROR
  ============================================ */

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
            onClick={loadMovies}
            className="mt-6 rounded-lg px-8 py-3 transition-all duration-300"
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

  /* ============================================
      UI
  ============================================ */

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
        items={trendingMovies}
        onMediaClick={
          handleMovieClick
        }
      />

      {/* Movie Sections */}

      <section className="relative z-10 -mt-28 pb-20">

      </section>
<section className="relative z-10 -mt-28 pb-20">

        <MediaRow
          title="Trending Movies"
          items={trendingMovies}
          onMediaClick={handleMovieClick}
          onAddWatchlist={handleAddWatchlist}
        />

        <MediaRow
          title="Popular Movies"
          items={popularMovies}
          onMediaClick={handleMovieClick}
          onAddWatchlist={handleAddWatchlist}
        />

        <MediaRow
          title="Top Rated Movies"
          items={topRatedMovies}
          onMediaClick={handleMovieClick}
          onAddWatchlist={handleAddWatchlist}
        />

        <MediaRow
          title="Upcoming Movies"
          items={upcomingMovies}
          onMediaClick={handleMovieClick}
          onAddWatchlist={handleAddWatchlist}
        />

        <MediaRow
          title="Now Playing"
          items={nowPlayingMovies}
          onMediaClick={handleMovieClick}
          onAddWatchlist={handleAddWatchlist}
        />
      </section>
    </main>
  );
}

export default Movies;


