import { getMovieVideos } from "./movieService";
import { getTvVideos } from "./tvShowService";
import { getAnimeDetails } from "./animeService";

/* ==========================================
    Resolve a playable YouTube trailer key
    for any normalized card item (Movie, TV
    or Anime), regardless of which listing
    it came from.
========================================== */

const pickYoutubeTrailer = (videos = []) =>
  videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
  videos.find((v) => v.site === "YouTube") ||
  videos[0];

export const getTrailerKeyForItem = async (item) => {
  if (!item?.id) return null;

  try {
    if (item.mediaType === "Movie") {
      const videos = await getMovieVideos(item.id);
      return pickYoutubeTrailer(videos)?.key || null;
    }

    if (item.mediaType === "TV") {
      const videos = await getTvVideos(item.id);
      return pickYoutubeTrailer(videos)?.key || null;
    }

    if (item.mediaType === "Anime") {
      const details = await getAnimeDetails(item.id);
      const trailer = details?.trailer;

      if (trailer && (trailer.site === "youtube" || trailer.site === "YouTube")) {
        return trailer.id || null;
      }
      return null;
    }
  } catch (err) {
    console.error("Failed to load trailer", err);
  }

  return null;
};
