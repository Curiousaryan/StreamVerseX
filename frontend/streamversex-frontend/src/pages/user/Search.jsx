import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import SearchBar from "../../components/user/search/SearchBar";
import SearchResults from "../../components/user/search/SearchResults";

import { searchAll } from "../../services/searchService";

import { ROUTES } from "../../routes/routeConstants";

import palette from "../../theme/palette";

const TABS = [
  { key: "all", label: "All" },
  { key: "movies", label: "Movies" },
  { key: "tv", label: "TV Shows" },
  { key: "anime", label: "Anime" },
];

const DEBOUNCE = 400;

function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("all");

  const [results, setResults] = useState({
    movies: [],
    tv: [],
    anime: [],
    all: [],
  });

  const debounceRef = useRef();

  const runSearch = useCallback(async (text) => {
    const trimmed = text.trim();

    if (!trimmed) {
      setResults({
        movies: [],
        tv: [],
        anime: [],
        all: [],
      });
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await searchAll(trimmed);

      setResults(data);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (e) {
      console.error(e);
      setError("Unable to search right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current)
      clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearchParams(query ? { q: query } : {});
      setActiveTab("all");
      runSearch(query);
    }, DEBOUNCE);

    return () => clearTimeout(debounceRef.current);
  }, [query, runSearch, setSearchParams]);

  const activeItems = useMemo(() => {
    switch (activeTab) {
      case "movies":
        return results.movies;

      case "tv":
        return results.tv;

      case "anime":
        return results.anime;

      default:
        return results.all;
    }
  }, [activeTab, results]);

  const counts = {
    all: results.all.length,
    movies: results.movies.length,
    tv: results.tv.length,
    anime: results.anime.length,
  };

  const openDetails = (item) => {
    switch ((item.mediaType || "").toLowerCase()) {
      case "movie":
        navigate(
          ROUTES.MOVIE_DETAILS.replace(":id", item.id)
        );
        break;

      case "tv":
        navigate(
          ROUTES.TV_DETAILS.replace(":id", item.id)
        );
        break;

      case "anime":
        navigate(
          ROUTES.ANIME_DETAILS.replace(":id", item.id)
        );
        break;

      default:
        break;
    }
  };

  return (
    <main
      className="min-h-screen px-4 pb-16 pt-28 md:px-8"
      style={{
        backgroundColor: palette.background.default,
        color: palette.text.primary,
      }}
    >
      <SearchBar
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
        placeholder="Search Movies, TV Shows & Anime..."
      />

      {query && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="rounded-full px-5 py-2 text-sm font-medium transition-all"
              style={
                activeTab === tab.key
                  ? {
                      backgroundColor:
                        palette.primary.main,
                      color: "#fff",
                    }
                  : {
                      backgroundColor:
                        "rgba(255,255,255,0.05)",
                      color:
                        palette.text.secondary,
                    }
              }
            >
              {tab.label} ({counts[tab.key]})
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex h-[40vh] items-center justify-center">
          <div
            className="h-12 w-12 animate-spin rounded-full border-[3px] border-t-transparent"
            style={{
              borderColor:
                palette.primary.main,
              borderTopColor:
                "transparent",
            }}
          />
        </div>
      )}

      {!loading && error && (
        <div className="text-center">
          <h2
            style={{
              color:
                palette.error.main,
            }}
          >
            {error}
          </h2>
        </div>
      )}

      {!loading && !error && (
        <>
          {query && (
            <p
              className="mb-6 text-sm"
              style={{
                color:
                  palette.text.secondary,
              }}
            >
              {counts.all} result
              {counts.all !== 1 ? "s" : ""} found
              for "{query}"
            </p>
          )}

          <SearchResults
            items={activeItems}
            query={query}
            onItemClick={openDetails}
            onAddWatchlist={(item) =>
              console.log(item)
            }
          />
        </>
      )}
    </main>
  );
}

export default Search;