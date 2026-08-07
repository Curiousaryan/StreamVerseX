import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroBanner from "../../components/user/home/HeroBanner";
import MediaRow from "../../components/user/home/MediaRow";

import { ROUTES } from "../../routes/routeConstants";
import { getHomePageData } from "../../services/homeService";
import { useWatchlist } from "../../context/WatchlistContext";

const CONTENT_TYPE = {
  Movie: "MOVIE",
  TV: "TV",
  Anime: "ANIME",
};

function Home() {
  const navigate = useNavigate();
  const { toggle } = useWatchlist();

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
    const contentType = CONTENT_TYPE[item?.mediaType];

    if (!item?.id || !contentType) {
      console.error("Cannot add to watchlist — missing id/mediaType:", item);
      return;
    }

    toggle(item.id, contentType);
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
      />

      <div className="pb-16">

        <MediaRow
          title="🔥 Trending Movies"
          items={homeData.trendingMovies}
          onItemClick={handleMediaClick}
          onViewAll={() => navigate(ROUTES.MOVIES)}
        />

        <MediaRow
          title="⭐ Popular Movies"
          items={homeData.popularMovies}
          onItemClick={handleMediaClick}
          onViewAll={() => navigate(ROUTES.MOVIES)}
        />

        <MediaRow
          title="🎬 Top Rated Movies"
          items={homeData.topRatedMovies}
          onItemClick={handleMediaClick}
          onViewAll={() => navigate(ROUTES.MOVIES)}
        />

        <MediaRow
          title="📺 Trending TV Shows"
          items={homeData.trendingTv}
          onItemClick={handleMediaClick}
          onViewAll={() => navigate(ROUTES.TV_SHOWS)}
        />

        <MediaRow
          title="📺 Popular TV Shows"
          items={homeData.popularTv}
          onItemClick={handleMediaClick}
          onViewAll={() => navigate(ROUTES.TV_SHOWS)}
        />

        <MediaRow
          title="🍥 Trending Anime"
          items={homeData.trendingAnime}
          onItemClick={handleMediaClick}
          onViewAll={() => navigate(ROUTES.ANIME)}
        />

        <MediaRow
          title="🍥 Popular Anime"
          items={homeData.popularAnime}
          onItemClick={handleMediaClick}
          onViewAll={() => navigate(ROUTES.ANIME)}
        />

        <MediaRow
          title="🤖 Recommended For You"
          items={homeData.trendingMovies}
          onItemClick={handleMediaClick}
        />

      </div>

    </div>
  );
}

export default Home;