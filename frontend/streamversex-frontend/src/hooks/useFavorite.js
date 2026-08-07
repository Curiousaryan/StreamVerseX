import { useCallback, useEffect, useState } from "react";

import {
  checkFavorite,
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";

/* ==========================================
    Tracks and toggles favorite status for a
    single piece of content (movie/tv/anime).

    item: { id, title, poster, mediaType }
========================================== */

export function useFavorite(item) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    if (!item?.id || !item?.mediaType) {
      setChecking(false);
      return undefined;
    }

    setChecking(true);

    checkFavorite(item.mediaType, item.id)
      .then((result) => {
        if (active) setIsFavorite(result);
      })
      .catch(() => {
        if (active) setIsFavorite(false);
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, [item?.id, item?.mediaType]);

  const toggle = useCallback(async () => {
    if (!item?.id || saving) return;

    setSaving(true);

    try {
      if (isFavorite) {
        await removeFavorite(item.mediaType, item.id);
        setIsFavorite(false);
      } else {
        await addFavorite(item);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Failed to update favorite", err);
    } finally {
      setSaving(false);
    }
  }, [item, isFavorite, saving]);

  return { isFavorite, checking, saving, toggle };
}
