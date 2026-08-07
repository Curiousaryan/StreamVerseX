import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Play,
  Heart,
  Plus,
  Share2,
} from "lucide-react";

const SocialIcon = ({ path, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    {...props}
  >
    <path d={path} />
  </svg>
);

const ICONS = {
  facebook:
    "M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9H16l-.4 2.9h-2.1v7A10 10 0 0 0 22 12",
  twitter:
    "M23 4.9c-.8.4-1.7.6-2.6.8 1-.6 1.7-1.5 2-2.6-.9.5-1.9.9-3 1.1-.9-1-2.1-1.5-3.4-1.5-2.6 0-4.7 2.1-4.7 4.7 0 .4 0 .7.1 1-3.9-.2-7.4-2.1-9.7-4.9-.4.7-.6 1.5-.6 2.3 0 1.6.8 3.1 2.1 3.9-.8 0-1.5-.2-2.1-.6v.1c0 2.3 1.6 4.2 3.8 4.6-.4.1-.8.2-1.2.2-.3 0-.6 0-.8-.1.6 1.9 2.3 3.2 4.4 3.3-1.6 1.3-3.7 2-5.9 2-.4 0-.8 0-1.1-.1 2.1 1.4 4.6 2.1 7.3 2.1 8.7 0 13.5-7.2 13.5-13.5v-.6c.9-.7 1.7-1.5 2.4-2.5z",
  instagram:
    "M12 2c-2.7 0-3.1 0-4.1.1-1.1.1-1.9.2-2.5.5-.7.3-1.2.6-1.8 1.2-.6.6-.9 1.1-1.2 1.8-.3.6-.4 1.4-.5 2.5C2 9.1 2 9.5 2 12s0 2.9.1 3.9c.1 1.1.2 1.9.5 2.5.3.7.6 1.2 1.2 1.8.6.6 1.1.9 1.8 1.2.6.3 1.4.4 2.5.5C8.9 22 9.3 22 12 22s2.9 0 3.9-.1c1.1-.1 1.9-.2 2.5-.5.7-.3 1.2-.6 1.8-1.2.6-.6.9-1.1 1.2-1.8.3-.6.4-1.4.5-2.5.1-1 .1-1.4.1-3.9s0-2.9-.1-3.9c-.1-1.1-.2-1.9-.5-2.5-.3-.7-.6-1.2-1.2-1.8-.6-.6-1.1-.9-1.8-1.2-.6-.3-1.4-.4-2.5-.5C14.9 2 14.5 2 12 2m0 1.8c2.6 0 2.9 0 4 .1.9 0 1.5.2 1.8.3.5.2.8.4 1.1.7.3.3.5.6.7 1.1.1.3.3.9.3 1.8.1 1.1.1 1.4.1 4s0 2.9-.1 4c0 .9-.2 1.5-.3 1.8-.2.5-.4.8-.7 1.1-.3.3-.6.5-1.1.7-.3.1-.9.3-1.8.3-1.1.1-1.4.1-4 .1s-2.9 0-4-.1c-.9 0-1.5-.2-1.8-.3-.5-.2-.8-.4-1.1-.7-.3-.3-.5-.6-.7-1.1-.1-.3-.3-.9-.3-1.8-.1-1.1-.1-1.4-.1-4s0-2.9.1-4c0-.9.2-1.5.3-1.8.2-.5.4-.8.7-1.1.3-.3.6-.5 1.1-.7.3-.1.9-.3 1.8-.3 1.1-.1 1.4-.1 4-.1M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10m0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4M17.5 5.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4",
};

import MediaRow from "../../components/user/home/MediaRow";

import palette from "../../theme/palette";

import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getMovieRecommendations,
} from "../../services/movieService";

import { normalizeMovie } from "../../services/homeService";
import { useFavorite } from "../../hooks/useFavorite";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ==========================================
      STATES
  ========================================== */

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [videos, setVideos] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const favoriteItem = movie
    ? {
        id: movie.id,
        title: movie.title,
        poster: movie.posterUrl,
        mediaType: "Movie",
      }
    : null;

  const { isFavorite, saving: favoriteSaving, toggle: toggleFavorite } =
    useFavorite(favoriteItem);
  const [activeVideo, setActiveVideo] = useState(null);

  /* ==========================================
      LOAD DATA
  ========================================== */

  const loadMovie = async () => {
    try {
      setLoading(true);
      setError("");

      const [movieData, creditsData, videosData, recommendationsData] =
        await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id),
          getMovieRecommendations(id),
        ]);

      setMovie(movieData);
      setCast(creditsData?.cast || []);
      setCrew(creditsData?.crew || []);
      const vids = videosData || [];
      setVideos(vids);
      const firstTrailer =
        vids.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
        vids[0] ||
        null;
      setActiveVideo(firstTrailer);
      setRecommendations((recommendationsData || []).map(normalizeMovie));
    } catch (err) {
      console.error(err);
      setError("Unable to load movie details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovie();
  }, [id]);

  /* ==========================================
      LOADING / ERROR
  ========================================== */

  if (loading) {
    return (
      <main
        className="flex min-h-screen items-center justify-center"
        style={{
          backgroundColor: palette.background.default,
          color: palette.text.primary,
        }}
      >
        <h2 className="text-2xl font-semibold">Loading Movie...</h2>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: palette.background.default }}
      >
        <div className="text-center">
          <h2
            className="text-3xl font-bold"
            style={{ color: palette.error.main }}
          >
            Unable to Load Movie
          </h2>
          <p className="mt-4" style={{ color: palette.text.secondary }}>
            {error}
          </p>
        </div>
      </main>
    );
  }

  /* ==========================================
      DERIVED VALUES
  ========================================== */

  const year = movie.releaseDate ? movie.releaseDate.slice(0, 4) : "";
  const scorePct = movie.rating ? Math.round(movie.rating * 10) : null;

  const keyCrew = crew.filter((c) =>
    ["Director", "Writer", "Screenplay", "Story", "Producer"].includes(c.job)
  );

  const directorNames = crew
    .filter((c) => c.job === "Director")
    .map((c) => c.name)
    .join(", ");

  const trailer = videos.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  ) || videos[0];

  /* ==========================================
      UI
  ========================================== */

  return (
    <main
      style={{
        backgroundColor: palette.background.default,
        color: palette.text.primary,
      }}
      className="min-h-screen"
    >
      {/* ==========================================
          TOP STRIP — poster + title block
      ========================================== */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {movie.backdropUrl || movie.posterUrl ? (
            <img
              src={movie.backdropUrl || movie.posterUrl}
              alt={movie.title}
              className="h-full w-full object-cover"
              style={{
                filter: movie.backdropUrl
                  ? "brightness(.55) blur(0px)"
                  : "brightness(.2) blur(20px) saturate(1.3)",
                transform: movie.backdropUrl ? "none" : "scale(1.2)",
              }}
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: `radial-gradient(circle at 20% 20%, ${palette.primary.main}33, transparent 55%), radial-gradient(circle at 80% 30%, ${palette.secondary.main}33, transparent 55%), ${palette.background.paper}`,
              }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, ${palette.background.default} 5%, rgba(11,11,15,0.75) 38%, rgba(11,11,15,0.25) 65%, rgba(11,11,15,0.15) 100%), linear-gradient(0deg, ${palette.background.default} 0%, rgba(11,11,15,0) 35%)`,
            }}
          />
        </div>

        <div className="relative z-10 flex w-full flex-col gap-6 px-6 py-10 md:flex-row md:px-10 lg:px-14">
          {/* Poster */}
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="h-[270px] w-[180px] flex-shrink-0 rounded-xl object-cover shadow-2xl md:h-[330px] md:w-[220px]"
          />

          {/* Title block */}
          <div className="flex-1">
            <h1 className="text-2xl font-black leading-tight md:text-4xl">
              {movie.title}{" "}
              {year && (
                <span
                  className="font-light"
                  style={{ color: palette.text.secondary }}
                >
                  ({year})
                </span>
              )}
            </h1>

            {movie.originalTitle &&
              movie.originalTitle !== movie.title && (
                <p
                  className="mt-1 text-sm italic"
                  style={{ color: palette.text.secondary }}
                >
                  Original Title: {movie.originalTitle}
                </p>
              )}

            <div
              className="mt-2 flex flex-wrap items-center gap-2 text-sm"
              style={{ color: palette.text.secondary }}
            >
              {movie.releaseDate && <span>{movie.releaseDate}</span>}
              {movie.genres?.length > 0 && <span>•</span>}
              {movie.genres?.slice(0, 3).join(", ")}
              {movie.runtime ? <span>•</span> : null}
              {movie.runtime ? <span>{movie.runtime}m</span> : null}
            </div>

            {/* Score + actions */}
            <div className="mt-5 flex flex-wrap items-center gap-5">
              {scorePct !== null && (
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border-4 text-lg font-bold"
                    style={{
                      borderColor:
                        scorePct >= 70
                          ? palette.success.main
                          : scorePct >= 40
                          ? palette.warning.main
                          : palette.error.main,
                      backgroundColor: palette.background.paper,
                    }}
                  >
                    {scorePct}
                    <span className="text-[10px] font-normal">%</span>
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: palette.text.secondary }}
                  >
                    User
                    <br />
                    Score
                  </span>
                  {movie.voteCount ? (
                    <span
                      className="text-xs"
                      style={{ color: palette.text.secondary }}
                    >
                      ({movie.voteCount.toLocaleString()} votes)
                    </span>
                  ) : null}
                </div>
              )}

              <button
                onClick={toggleFavorite}
                disabled={favoriteSaving}
                className="flex h-11 w-11 items-center justify-center rounded-full border transition hover:scale-105 disabled:opacity-60"
                style={{
                  borderColor: isFavorite
                    ? palette.primary.main
                    : palette.text.secondary,
                  backgroundColor: isFavorite
                    ? "rgba(229,9,20,.15)"
                    : "transparent",
                  color: isFavorite ? palette.primary.main : "inherit",
                }}
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </button>

              <button
                className="flex h-11 w-11 items-center justify-center rounded-full border transition hover:scale-105"
                style={{ borderColor: palette.text.secondary }}
                title="Add to Watchlist"
              >
                <Plus size={18} />
              </button>

              <button
                className="flex h-11 w-11 items-center justify-center rounded-full border transition hover:scale-105"
                style={{ borderColor: palette.text.secondary }}
                title="Share"
              >
                <Share2 size={18} />
              </button>

              {trailer && (
                <button
                  className="flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition hover:scale-105"
                  style={{ backgroundColor: palette.primary.main }}
                  onClick={() =>
                    document
                      .getElementById("trailer-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Play size={18} fill="currentColor" />
                  Play Trailer
                </button>
              )}
            </div>

            {movie.tagline && (
              <p
                className="mt-6 italic"
                style={{ color: palette.text.secondary }}
              >
                {movie.tagline}
              </p>
            )}

            <h3 className="mt-4 text-lg font-bold">Overview</h3>
            <p
              className="mt-1 max-w-3xl leading-7"
              style={{ color: palette.text.secondary }}
            >
              {movie.overview}
            </p>

            {keyCrew.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
                {keyCrew.slice(0, 4).map((person) => (
                  <button
                    key={`${person.id}-${person.job}`}
                    onClick={() => navigate(`/person/${person.id}`)}
                    className="text-left transition hover:opacity-80"
                  >
                    <p className="font-semibold">{person.name}</p>
                    <p
                      className="text-sm"
                      style={{ color: palette.text.secondary }}
                    >
                      {person.job}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          MAIN CONTENT — content + sidebar
      ========================================== */}

      <section className="w-full px-6 py-10 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* LEFT / MAIN COLUMN */}
          <div className="lg:col-span-2">
            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <h2 className="mb-5 text-2xl font-bold">Top Billed Cast</h2>
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                  {cast.slice(0, 10).map((person) => (
                    <button
                      key={person.id}
                      onClick={() => navigate(`/person/${person.id}`)}
                      className="text-left transition hover:opacity-80"
                    >
                      <img
                        src={person.profileUrl}
                        alt={person.name}
                        className="aspect-[2/3] w-full rounded-lg object-cover"
                        style={{ backgroundColor: palette.background.paper }}
                      />
                      <h3 className="mt-2 text-sm font-semibold leading-tight">
                        {person.name}
                      </h3>
                      <p
                        className="text-xs leading-tight"
                        style={{ color: palette.text.secondary }}
                      >
                        {person.character}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {activeVideo && (
              <div id="trailer-section" className="mt-14">
                <h2 className="mb-5 text-2xl font-bold">Videos</h2>

                <div
                  className="overflow-hidden rounded-2xl shadow-2xl"
                  style={{ backgroundColor: palette.background.paper }}
                >
                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${activeVideo.key}`}
                      title={activeVideo.name || "Video"}
                      allowFullScreen
                    />
                  </div>
                </div>

                {videos.length > 1 && (
                  <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                    {videos.map((v) => {
                      const isActive = v.id === activeVideo.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setActiveVideo(v)}
                          className="group flex-shrink-0 text-left"
                          style={{ width: 220 }}
                        >
                          <div
                            className="relative overflow-hidden rounded-lg"
                            style={{
                              outline: isActive
                                ? `2px solid ${palette.primary.main}`
                                : "2px solid transparent",
                            }}
                          >
                            <img
                              src={`https://img.youtube.com/vi/${v.key}/hqdefault.jpg`}
                              alt={v.name}
                              className="aspect-video w-full object-cover transition group-hover:opacity-80"
                              style={{ backgroundColor: palette.background.paper }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play
                                size={28}
                                fill="currentColor"
                                style={{
                                  color: isActive
                                    ? palette.primary.main
                                    : palette.text.primary,
                                }}
                              />
                            </div>
                            {v.type && (
                              <span
                                className="absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase"
                                style={{
                                  backgroundColor: "rgba(0,0,0,0.7)",
                                  color: palette.text.primary,
                                }}
                              >
                                {v.type}
                              </span>
                            )}
                          </div>
                          <p
                            className="mt-1 truncate text-xs"
                            style={{
                              color: isActive
                                ? palette.text.primary
                                : palette.text.secondary,
                            }}
                          >
                            {v.name}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="mt-14">
                <MediaRow
                  title="More Like This"
                  items={recommendations}
                  onItemClick={(item) => navigate(`/movies/${item.id}`)}
                />
              </div>
            )}
          </div>

          {/* RIGHT / SIDEBAR */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: palette.background.paper }}
            >
              <div className="mb-5 flex items-center gap-4">
                <a href="#" style={{ color: palette.text.secondary }}>
                  <SocialIcon path={ICONS.facebook} />
                </a>
                <a href="#" style={{ color: palette.text.secondary }}>
                  <SocialIcon path={ICONS.twitter} />
                </a>
                <a href="#" style={{ color: palette.text.secondary }}>
                  <SocialIcon path={ICONS.instagram} />
                </a>
                {movie.imdbId && (
                  <a
                    href={`https://www.imdb.com/title/${movie.imdbId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto text-xs font-bold"
                    style={{ color: palette.warning.main }}
                  >
                    IMDb
                  </a>
                )}
              </div>

              {movie.status && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Status</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {movie.status}
                  </p>
                </div>
              )}

              {movie.originalTitle &&
                movie.originalTitle !== movie.title && (
                  <div className="mb-4">
                    <h4 className="text-sm font-bold">Original Title</h4>
                    <p
                      className="text-sm"
                      style={{ color: palette.text.secondary }}
                    >
                      {movie.originalTitle}
                    </p>
                  </div>
                )}

              {movie.voteCount ? (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Vote Count</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {movie.voteCount.toLocaleString()}
                  </p>
                </div>
              ) : null}

              {movie.originalLanguage && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Original Language</h4>
                  <p
                    className="text-sm uppercase"
                    style={{ color: palette.text.secondary }}
                  >
                    {movie.originalLanguage}
                  </p>
                </div>
              )}

              {directorNames && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Director</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {directorNames}
                  </p>
                </div>
              )}

              {movie.genres?.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-bold">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full px-3 py-1 text-xs"
                        style={{
                          backgroundColor: palette.background.default,
                          color: palette.text.secondary,
                        }}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default MovieDetails;
