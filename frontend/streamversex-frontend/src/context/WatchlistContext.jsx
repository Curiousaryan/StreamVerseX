import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  updateWatchStatus,
} from "../services/watchlistService";

const WatchlistContext = createContext(null);

/**
 * Normalizes a raw watchlist entry from the backend into a guaranteed shape.
 * Different backends name these fields differently (contentId vs id vs
 * movieId, contentType vs type) — this fallback chain means isSaved/toggle
 * keep working even if the field names don't match our first guess.
 */
function normalizeEntry(entry) {
  if (!entry) return entry;

  return {
    ...entry,
    contentId: entry.contentId ?? entry.id ?? entry.movieId ?? entry.tmdbId,
    contentType: entry.contentType ?? entry.type ?? entry.mediaType,
  };
}

// Compare as strings so "550" (string) and 550 (number) are treated as the
// same id — this was the main reason repeat "+" clicks kept failing:
// isSaved() would return false (strict === on mismatched types), so the app
// tried to add the same item twice and the backend rejected it as a
// duplicate, which surfaced as a generic "Failed to add to Watchlist".
function sameEntry(entry, contentId, contentType) {
  return (
    String(entry.contentId) === String(contentId) &&
    String(entry.contentType) === String(contentType)
  );
}

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingIds, setPendingIds] = useState([]);

  // ===========================
  // Load
  // ===========================

  const refresh = async () => {
    try {
      setLoading(true);

      const data = await getWatchlist();
      setWatchlist(Array.isArray(data) ? data.map(normalizeEntry) : []);
    } catch (error) {
      console.error("Failed to load watchlist:", error);
      // Don't toast here — this can fire on first page load before the
      // user has done anything, and a logged-out user hitting this is
      // expected, not an error worth interrupting them with.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  // ===========================
  // Add
  // ===========================

  const add = async (contentId, contentType) => {
    if (!localStorage.getItem("token")) {
      toast.error("Please sign in to add to your watchlist.");
      return false;
    }

    if (!contentId || !contentType) {
      console.error("Watchlist add called with missing data:", {
        contentId,
        contentType,
      });
      toast.error("Couldn't add this item — missing content info.");
      return false;
    }

    const key = `${contentType}-${contentId}`;
    setPendingIds((previous) => [...previous, key]);

    try {
      await addToWatchlist({ contentId, contentType });
      toast.success("Added to Watchlist");
      await refresh();
      return true;
    } catch (error) {
      const status = error.response?.status;

      // 409 (or a backend that reuses 400 for "already exists") just means
      // the item is already saved — that's not really a failure from the
      // user's point of view, so resync silently instead of alarming them.
      const message = error.friendlyMessage || error.response?.data?.message || "";

      if (status === 409 || /already/i.test(message)) {
        toast("Already in your watchlist", { icon: "✅" });
        await refresh();
        return true;
      }

      console.error("Failed to add to watchlist:", error);
      toast.error(message || "Failed to add to Watchlist");
      return false;
    } finally {
      setPendingIds((previous) => previous.filter((item) => item !== key));
    }
  };

  // ===========================
  // Remove
  // ===========================

  const remove = async (contentType, contentId) => {
    try {
      await removeFromWatchlist(contentType, contentId);
      toast.success("Removed from Watchlist");
      await refresh();
      return true;
    } catch (error) {
      console.error("Failed to remove from watchlist:", error);
      toast.error(error.friendlyMessage || "Failed to remove");
      return false;
    }
  };

  // ===========================
  // Toggle
  // ===========================

  const toggle = async (contentId, contentType) => {
    const exists = watchlist.some((item) =>
      sameEntry(item, contentId, contentType)
    );

    if (exists) {
      await remove(contentType, contentId);
      return false;
    }

    await add(contentId, contentType);
    return true;
  };

  // ===========================
  // Status
  // ===========================

  const updateStatus = async (contentType, contentId, status) => {
    try {
      await updateWatchStatus(contentType, contentId, status);
      toast.success("Status Updated");
      await refresh();
    } catch (error) {
      console.error("Failed to update watch status:", error);
      toast.error(error.friendlyMessage || "Unable to update status");
    }
  };

  // ===========================
  // Check
  // ===========================

  const isSaved = (contentId, contentType) =>
    watchlist.some((item) => sameEntry(item, contentId, contentType));

  const isPending = (contentId, contentType) =>
    pendingIds.includes(`${contentType}-${contentId}`);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        loading,
        refresh,
        add,
        remove,
        toggle,
        updateStatus,
        isSaved,
        isPending,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}