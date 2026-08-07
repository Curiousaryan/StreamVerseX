import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, Film, Tv, Sparkles, Play } from "lucide-react";

import palette from "../../theme/palette";
import { getFavorites, removeFavorite } from "../../services/favoriteService";
import { getTrailerKeyForItem } from "../../services/trailerService";
import TrailerModal from "../../components/common/TrailerModal";

const FALLBACK_POSTER =
  "https://placehold.co/400x600/111827/ffffff?text=No+Image";

const FILTERS = [
  { key: "all", label: "All", icon: Heart },
  { key: "Movie", label: "Movies", icon: Film },
  { key: "TV", label: "TV Shows", icon: Tv },
  { key: "Anime", label: "Anime", icon: Sparkles },
];

function detailsPath(item) {
  if (item.mediaType === "Movie") return `/movies/${item.id}`;
  if (item.mediaType === "TV") return `/tv/${item.id}`;
  if (item.mediaType === "Anime") return `/anime/${item.id}`;
  return "/";
}

function Favorites() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("all");
  const [removingId, setRemovingId] = useState(null);

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerTitle, setTrailerTitle] = useState("");

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load your favorites.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const visibleFavorites = useMemo(() => {
    if (filter === "all") return favorites;
    return favorites.filter((item) => item.mediaType === filter);
  }, [filter, favorites]);

  // Sample of posters for the ambient collage header
  const collagePosters = useMemo(
    () => favorites.filter((f) => f.poster).slice(0, 12),
    [favorites]
  );

  const handleRemove = async (item) => {
    const key = `${item.mediaType}-${item.id}`;
    setRemovingId(key);

    try {
      await removeFavorite(item.mediaType, item.id);
      setFavorites((prev) =>
        prev.filter(
          (f) => !(f.mediaType === item.mediaType && f.id === item.id)
        )
      );
    } catch (err) {
      console.error("Failed to remove favorite", err);
    } finally {
      setRemovingId(null);
    }
  };

  const handlePlay = async (item) => {
    setTrailerTitle(item.title);
    setTrailerOpen(true);
    setTrailerLoading(true);
    setTrailerKey(null);

    const key = await getTrailerKeyForItem(item);

    setTrailerKey(key);
    setTrailerLoading(false);
  };

  return (
    <main
      className="min-h-screen pb-24"
      style={{
        backgroundColor: palette.background.default,
        color: palette.text.primary,
      }}
    >
      <style>{`
        @keyframes favCardIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ==========================================
          AMBIENT COLLAGE HEADER
      ========================================== */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0" style={{ maxHeight: 360 }}>
          {collagePosters.length > 0 ? (
            <div
              className="grid h-full grid-cols-6 gap-1 sm:grid-cols-8 md:grid-cols-10"
              style={{
                opacity: 0.55,
                filter: "blur(1px) saturate(1.2) brightness(0.85)",
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
              }}
            >
              {Array.from({ length: 20 }).map((_, i) => {
                const poster = collagePosters[i % collagePosters.length];
                return (
                  <img
                    key={i}
                    src={poster.poster}
                    alt=""
                    className="aspect-[2/3] w-full object-cover"
                  />
                );
              })}
            </div>
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: `radial-gradient(circle at 20% 20%, ${palette.primary.main}22, transparent 55%), radial-gradient(circle at 80% 30%, ${palette.secondary.main}22, transparent 55%)`,
              }}
            />
          )}

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${palette.background.default}66 0%, ${palette.background.default}bb 50%, ${palette.background.default} 100%)`,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-6 pt-6 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-4">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg sm:h-14 sm:w-14"
              style={{
                background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.secondary.main})`,
                boxShadow: `0 8px 30px ${palette.primary.main}55`,
              }}
            >
              <Heart size={24} fill="currentColor" />
            </span>

            <div>
              <h1 className="text-2xl font-black leading-tight sm:text-3xl md:text-4xl">
                My Favorites
              </h1>
              {!loading && (
                <p
                  className="mt-1 text-sm"
                  style={{ color: palette.text.secondary }}
                >
                  {favorites.length} title{favorites.length === 1 ? "" : "s"}{" "}
                  saved to your personal collection
                </p>
              )}
            </div>
          </div>

          {/* Filters */}
          {!loading && favorites.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2.5">
              {FILTERS.map(({ key, label, icon: Icon }) => {
                const count =
                  key === "all"
                    ? favorites.length
                    : favorites.filter((f) => f.mediaType === key).length;

                if (key !== "all" && count === 0) return null;

                const active = filter === key;

                return (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300"
                    style={{
                      backgroundColor: active
                        ? palette.primary.main
                        : "rgba(255,255,255,0.06)",
                      color: active ? "#fff" : palette.text.secondary,
                      boxShadow: active
                        ? `0 6px 20px ${palette.primary.main}55`
                        : "none",
                      border: `1px solid ${
                        active ? palette.primary.main : "rgba(255,255,255,0.1)"
                      }`,
                    }}
                  >
                    <Icon size={14} />
                    {label} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ==========================================
          BODY
      ========================================== */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Loading */}
        {loading && (
          <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] animate-pulse rounded-2xl"
                style={{ backgroundColor: palette.background.paper }}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-16 flex flex-col items-center text-center">
            <p style={{ color: palette.error.main }}>{error}</p>
            <button
              onClick={loadFavorites}
              className="mt-6 rounded-lg px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: palette.primary.main,
                color: palette.text.primary,
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && favorites.length === 0 && (
          <div className="mt-4 flex flex-col items-center py-16 text-center">
            <div
              className="mb-6 flex h-28 w-28 items-center justify-center rounded-full"
              style={{
                background: `radial-gradient(circle, ${palette.primary.main}22, transparent 70%)`,
                border: `1px solid ${palette.primary.main}44`,
              }}
            >
              <Heart size={40} style={{ color: palette.primary.main }} />
            </div>
            <h2 className="text-xl font-bold sm:text-2xl">
              No favorites yet
            </h2>
            <p
              className="mt-2 max-w-sm"
              style={{ color: palette.text.secondary }}
            >
              Tap the heart icon on any movie, TV show or anime to save it
              here for quick access.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="mt-8 rounded-lg px-8 py-3 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: palette.primary.main,
                color: palette.text.primary,
              }}
            >
              Browse StreamVerseX
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && visibleFavorites.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {visibleFavorites.map((item, index) => {
              const key = `${item.mediaType}-${item.id}`;
              const isRemoving = removingId === key;

              return (
                <article
                  key={key}
                  onClick={() => navigate(detailsPath(item))}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.04] hover:z-20"
                  style={{
                    animation: "favCardIn 0.5s ease both",
                    animationDelay: `${Math.min(index * 45, 500)}ms`,
                  }}
                >
                  <div
                    className="relative aspect-[2/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/5 transition-all duration-500 group-hover:ring-2"
                    style={{
                      backgroundColor: palette.background.paper,
                      "--tw-ring-color": palette.primary.main,
                    }}
                  >
                    <img
                      src={item.poster || FALLBACK_POSTER}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = FALLBACK_POSTER;
                      }}
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                    />

                    {/* Ambient glow on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        boxShadow: `inset 0 0 60px ${palette.primary.main}33`,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                    {/* Media Type badge */}
                    <div
                      className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg"
                      style={{ backgroundColor: palette.primary.main }}
                    >
                      {item.mediaType}
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item);
                      }}
                      disabled={isRemoving}
                      title="Remove from Favorites"
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:scale-110 disabled:opacity-60"
                      style={{
                        backgroundColor: "rgba(0,0,0,.65)",
                        color: palette.error.main,
                      }}
                    >
                      <Trash2 size={16} />
                    </button>

                    {/* Center play button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlay(item);
                      }}
                      title="Play Trailer"
                      className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:scale-110"
                      style={{
                        backgroundColor: palette.primary.main,
                        color: "#fff",
                      }}
                    >
                      <Play size={22} fill="currentColor" />
                    </button>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="line-clamp-2 text-sm font-bold text-white drop-shadow">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <TrailerModal
        open={trailerOpen}
        onClose={() => {
          setTrailerOpen(false);
          setTrailerKey(null);
        }}
        title={trailerTitle}
        trailerKey={trailerKey}
        loading={trailerLoading}
      />
    </main>
  );
}

export default Favorites;
