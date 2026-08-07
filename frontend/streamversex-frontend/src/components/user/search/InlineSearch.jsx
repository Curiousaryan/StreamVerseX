import { useEffect, useRef, useState } from "react";

import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

import palette from "../../../theme/palette";

const DEBOUNCE_MS = 400;

function InlineSearch({
  searchFn,
  placeholder,
  onItemClick,
  onAddWatchlist,
  children,
}) {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceRef = useRef(null);
  const requestId = useRef(0);

  // ⭐ Search Cache
  const cache = useRef(new Map());

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const trimmed = value.trim();

    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setError("");
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const currentRequest = ++requestId.current;

      // ⭐ Serve cached result instantly
      if (cache.current.has(trimmed)) {
        setResults(cache.current.get(trimmed));
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await searchFn(trimmed);

        cache.current.set(trimmed, data);

        if (currentRequest === requestId.current) {
          setResults(data);
        }
      } catch (err) {
        console.error(err);

        if (currentRequest === requestId.current) {
          setError(
            "Search service is temporarily unavailable."
          );
        }
      } finally {
        if (currentRequest === requestId.current) {
          setLoading(false);
        }
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
  }, [value, searchFn]);

  const isSearching = value.trim().length > 0;

  return (
    <div>

      <SearchBar
    value={value}
    onChange={setValue}
    onClear={() => setValue("")}
    placeholder={placeholder}
    autoFocus={false}
/>

      {isSearching ? (
        <section className="relative z-10 px-4 pt-6 pb-20 md:px-8">

          {loading && (
            <div className="flex min-h-[35vh] flex-col items-center justify-center gap-4">
              <div
                className="h-12 w-12 animate-spin rounded-full border-[3px] border-t-transparent"
                style={{
                  borderColor: palette.primary.main,
                  borderTopColor: "transparent",
                }}
              />

              <p
                style={{
                  color: palette.text.secondary,
                }}
              >
                Searching...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="flex min-h-[35vh] items-center justify-center">
              <p
                className="text-center text-sm"
                style={{
                  color: palette.error.main,
                }}
              >
                {error}
              </p>
            </div>
          )}

          {!loading && !error && (
            <SearchResults
              items={results}
              query={value.trim()}
              onItemClick={onItemClick}
              onAddWatchlist={onAddWatchlist}
            />
          )}
        </section>
      ) : (
        children
      )}
    </div>
  );
}

export default InlineSearch;