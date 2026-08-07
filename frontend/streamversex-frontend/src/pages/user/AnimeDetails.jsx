import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Play,
  Heart,
  Plus,
  Share2,
  ExternalLink,
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
  getAnimeDetails,
  getAnimeCharacters,
  getAnimeRecommendations,
} from "../../services/animeService";

import { normalizeAnime } from "../../services/homeService";

function AnimeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ==========================================
      STATES
  ========================================== */

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  /* ==========================================
      LOAD DATA
  ========================================== */

  const loadAnime = async () => {
    try {
      setLoading(true);
      setError("");

      const [animeData, charactersData, recommendationsData] =
        await Promise.all([
          getAnimeDetails(id),
          getAnimeCharacters(id),
          getAnimeRecommendations(id),
        ]);

      setAnime(animeData);
      setCharacters(charactersData || []);
      setRecommendations(
        (recommendationsData || []).map(normalizeAnime)
      );
    } catch (err) {
      console.error(err);
      setError("Unable to load anime details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnime();
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
        <h2 className="text-2xl font-semibold">Loading Anime...</h2>
      </main>
    );
  }

  if (error || !anime) {
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
            Unable to Load Anime
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

  const displayTitle = anime.title || anime.englishTitle;
  const year = anime.seasonYear || (anime.startDate?.split("-")[0] ?? "");
  const scorePct = anime.averageScore ?? null;

  const studioNames = (anime.studios || [])
    .filter((s) => s.animationStudio)
    .map((s) => s.name)
    .join(", ") ||
    (anime.studios || []).map((s) => s.name).join(", ");

  const trailer = anime.trailer;

  const seasonLabel =
    anime.season && anime.seasonYear
      ? `${anime.season.charAt(0)}${anime.season.slice(1).toLowerCase()} ${anime.seasonYear}`
      : anime.seasonYear || "";

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
          {anime.bannerImageUrl || anime.coverImageUrl ? (
            <img
              src={anime.bannerImageUrl || anime.coverImageUrl}
              alt={displayTitle}
              className="h-full w-full object-cover"
              style={{
                filter: anime.bannerImageUrl
                  ? "brightness(.55) blur(0px)"
                  : "brightness(.2) blur(20px) saturate(1.3)",
                transform: anime.bannerImageUrl ? "none" : "scale(1.2)",
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
            src={anime.coverImageUrl}
            alt={displayTitle}
            className="h-[270px] w-[180px] flex-shrink-0 rounded-xl object-cover shadow-2xl md:h-[330px] md:w-[220px]"
          />

          {/* Title block */}
          <div className="flex-1">
            <h1 className="text-2xl font-black leading-tight md:text-4xl">
              {displayTitle}{" "}
              {year && (
                <span
                  className="font-light"
                  style={{ color: palette.text.secondary }}
                >
                  ({year})
                </span>
              )}
            </h1>

            {anime.nativeTitle && anime.nativeTitle !== displayTitle && (
              <p
                className="mt-1 text-sm italic"
                style={{ color: palette.text.secondary }}
              >
                Native Title: {anime.nativeTitle}
              </p>
            )}

            {anime.synonyms?.length > 0 && (
              <p
                className="mt-1 text-xs"
                style={{ color: palette.text.secondary }}
              >
                Also known as: {anime.synonyms.join(", ")}
              </p>
            )}

            <div
              className="mt-2 flex flex-wrap items-center gap-2 text-sm"
              style={{ color: palette.text.secondary }}
            >
              {anime.startDate && <span>{anime.startDate}</span>}
              {anime.format ? <span>•</span> : null}
              {anime.format && <span>{anime.format}</span>}
              {anime.episodes ? <span>•</span> : null}
              {anime.episodes ? <span>{anime.episodes} eps</span> : null}
              {anime.duration ? <span>•</span> : null}
              {anime.duration ? <span>{anime.duration}m</span> : null}
              {anime.genres?.length > 0 && <span>•</span>}
              {anime.genres?.slice(0, 3).join(", ")}
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
                    Average
                    <br />
                    Score
                  </span>
                  {anime.favourites ? (
                    <span
                      className="text-xs"
                      style={{ color: palette.text.secondary }}
                    >
                      ({anime.favourites.toLocaleString()} favourites)
                    </span>
                  ) : null}
                </div>
              )}

              <button
                className="flex h-11 w-11 items-center justify-center rounded-full border transition hover:scale-105"
                style={{ borderColor: palette.text.secondary }}
                title="Add to Favorites"
              >
                <Heart size={18} />
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

              {trailer?.videoUrl && (
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

            <h3 className="mt-4 text-lg font-bold">Overview</h3>
            <p
              className="mt-1 max-w-3xl leading-7"
              style={{
                color: palette.text.secondary,
              }}
              dangerouslySetInnerHTML={{
                __html: anime.description || "",
              }}
            />

            {studioNames && (
              <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
                <div className="text-left">
                  <p className="font-semibold">{studioNames}</p>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    Studio
                  </p>
                </div>
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
            {/* Characters */}
            {characters.length > 0 && (
              <div>
                <h2 className="mb-5 text-2xl font-bold">Characters</h2>
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                  {characters.slice(0, 10).map((character) => {
                    const voiceActor = character.voiceActors?.[0];
                    return (
                      <a
                        key={character.id}
                        href={character.siteUrl || "#"}
                        target={character.siteUrl ? "_blank" : undefined}
                        rel={character.siteUrl ? "noreferrer" : undefined}
                        className="text-left transition hover:opacity-80"
                      >
                        <img
                          src={character.imageUrl}
                          alt={character.name}
                          className="aspect-[2/3] w-full rounded-lg object-cover"
                          style={{ backgroundColor: palette.background.paper }}
                        />
                        <h3 className="mt-2 text-sm font-semibold leading-tight">
                          {character.name}
                        </h3>
                        <p
                          className="text-xs leading-tight"
                          style={{ color: palette.text.secondary }}
                        >
                          {character.role}
                        </p>
                        {voiceActor && (
                          <p
                            className="mt-1 text-xs leading-tight italic"
                            style={{ color: palette.text.secondary }}
                          >
                            {voiceActor.name}
                          </p>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Trailer */}
            {trailer?.videoUrl && (
              <div id="trailer-section" className="mt-14">
                <h2 className="mb-5 text-2xl font-bold">Trailer</h2>

                <div
                  className="overflow-hidden rounded-2xl shadow-2xl"
                  style={{ backgroundColor: palette.background.paper }}
                >
                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    {trailer.site === "youtube" || trailer.site === "YouTube" ? (
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${trailer.id}`}
                        title={displayTitle}
                        allowFullScreen
                      />
                    ) : (
                      <a
                        href={trailer.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 flex h-full w-full items-center justify-center"
                      >
                        <img
                          src={trailer.thumbnailUrl}
                          alt={displayTitle}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <Play
                          size={64}
                          fill="currentColor"
                          style={{ color: palette.text.primary }}
                          className="relative z-10"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="mt-14">
                <MediaRow
                  title="More Like This"
                  items={recommendations}
                  onItemClick={(item) => navigate(`/anime/${item.id}`)}
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
                {anime.siteUrl && (
                  <a
                    href={anime.siteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto flex items-center gap-1 text-xs font-bold"
                    style={{ color: palette.warning.main }}
                  >
                    AniList <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {anime.status && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Status</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {anime.status}
                  </p>
                </div>
              )}

              {anime.format && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Format</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {anime.format}
                  </p>
                </div>
              )}

              {anime.source && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Source</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {anime.source}
                  </p>
                </div>
              )}

              {(anime.episodes || anime.duration) && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Episodes / Duration</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {anime.episodes ?? "-"} episodes
                    {anime.duration ? ` · ${anime.duration}m each` : ""}
                  </p>
                </div>
              )}

              {seasonLabel && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Season</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {seasonLabel}
                  </p>
                </div>
              )}

              {anime.startDate && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Start Date</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {anime.startDate}
                  </p>
                </div>
              )}

              {anime.endDate && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">End Date</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {anime.endDate}
                  </p>
                </div>
              )}

              {anime.countryOfOrigin && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Country of Origin</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {anime.countryOfOrigin}
                  </p>
                </div>
              )}

              {anime.popularity ? (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Popularity</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {anime.popularity.toLocaleString()}
                  </p>
                </div>
              ) : null}

              {anime.meanScore ? (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Mean Score</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {anime.meanScore}%
                  </p>
                </div>
              ) : null}

              {studioNames && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Studios</h4>
                  <p
                    className="text-sm"
                    style={{ color: palette.text.secondary }}
                  >
                    {studioNames}
                  </p>
                </div>
              )}

              {anime.genres?.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-bold">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
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

export default AnimeDetails;
