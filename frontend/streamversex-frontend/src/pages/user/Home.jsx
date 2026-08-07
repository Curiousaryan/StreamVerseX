import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroBanner from "../../components/user/home/HeroBanner";
import MediaRow from "../../components/user/home/MediaRow";
import TrailerModal from "../../components/common/TrailerModal";

import { ROUTES } from "../../routes/routeConstants";
import { getHomePageData } from "../../services/homeService";
import { getTrailerKeyForItem } from "../../services/trailerService";

function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [homeData, setHomeData] = useState({
    trendingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    trendingTv: [],
    popularTv: [],
    trendingAnime: [],
    popularAnime: [],
  });

  useEffect(() => {
    const loadHome = async () => {
      try {
        const data = await getHomePageData();
        setHomeData(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadHome();
  }, []);

  const heroItems = useMemo(() => {
    return [
      ...homeData.trendingMovies.slice(0, 3),
      ...homeData.trendingTv.slice(0, 3),
      ...homeData.trendingAnime.slice(0, 3),
    ];
  }, [homeData]);

  const handleMediaClick = (item) => {
    if (!item) return;

    switch (item.mediaType) {
      case "Movie":
        navigate(`/movies/${item.id}`);
        break;

      case "TV":
        navigate(`/tv/${item.id}`);
        break;

      case "Anime":
        navigate(`/anime/${item.id}`);
        break;

      default:
        break;
    }
  };

  const handleAddWatchlist = (item) => {
    console.log("Watchlist:", item);
  };

  /* ==========================================
      TRAILER MODAL
  ========================================== */

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerTitle, setTrailerTitle] = useState("");

  const handlePlay = async (item) => {
    setTrailerTitle(item.title);
    setTrailerOpen(true);
    setTrailerLoading(true);
    setTrailerKey(null);

    const key = await getTrailerKeyForItem(item);

    setTrailerKey(key);
    setTrailerLoading(false);
  };

  const closeTrailer = () => {
    setTrailerOpen(false);
    setTrailerKey(null);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#050505] text-white">
        Loading StreamVerseX...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#050505] text-red-500">
        Failed to load home page.
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white">

      <HeroBanner
        items={heroItems}
        onViewDetails={handleMediaClick}
        onWatchlist={handleAddWatchlist}
        onPlay={handlePlay}
      />

      <div className="pb-16">

        <MediaRow
          title="🔥 Trending Movies"
          items={homeData.trendingMovies}
          onItemClick={handleMediaClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
          onViewAll={() => navigate(ROUTES.MOVIES)}
        />

        <MediaRow
          title="⭐ Popular Movies"
          items={homeData.popularMovies}
          onItemClick={handleMediaClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
          onViewAll={() => navigate(ROUTES.MOVIES)}
        />

        <MediaRow
          title="🎬 Top Rated Movies"
          items={homeData.topRatedMovies}
          onItemClick={handleMediaClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
          onViewAll={() => navigate(ROUTES.MOVIES)}
        />

        <MediaRow
          title="📺 Trending TV Shows"
          items={homeData.trendingTv}
          onItemClick={handleMediaClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
          onViewAll={() => navigate(ROUTES.TV_SHOWS)}
        />

        <MediaRow
          title="📺 Popular TV Shows"
          items={homeData.popularTv}
          onItemClick={handleMediaClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
          onViewAll={() => navigate(ROUTES.TV_SHOWS)}
        />

        <MediaRow
          title="🍥 Trending Anime"
          items={homeData.trendingAnime}
          onItemClick={handleMediaClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
          onViewAll={() => navigate(ROUTES.ANIME)}
        />

        <MediaRow
          title="🍥 Popular Anime"
          items={homeData.popularAnime}
          onItemClick={handleMediaClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
          onViewAll={() => navigate(ROUTES.ANIME)}
        />

        <MediaRow
          title="🤖 Recommended For You"
          items={homeData.trendingMovies}
          onItemClick={handleMediaClick}
          onPlay={handlePlay}
          onAddWatchlist={handleAddWatchlist}
        />

      </div>

      <TrailerModal
        open={trailerOpen}
        onClose={closeTrailer}
        title={trailerTitle}
        trailerKey={trailerKey}
        loading={trailerLoading}
      />

    </div>
  );
}

export default Home;