import { useNavigate } from "react-router-dom";

import HeroBanner from "../../components/user/home/HeroBanner";
import MediaRow from "../../components/user/home/MediaRow";

import { ROUTES } from "../../routes/routeConstants";

function Home() {
  const navigate = useNavigate();

  // --------------------------------------------------
  // TEMPORARY DATA
  // Replace with backend/service data later.
  // --------------------------------------------------

  const featured = {
    id: 1,
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    backdrop:
      "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    rating: 8.7,
    year: 2014,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    mediaType: "Movie",
  };

  const trending = [
    {
      id: 1,
      title: "Interstellar",
      image:
        "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: 8.7,
      year: 2014,
      mediaType: "Movie",
    },
    {
      id: 2,
      title: "Inception",
      image:
        "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
      rating: 8.4,
      year: 2010,
      mediaType: "Movie",
    },
    {
      id: 3,
      title: "The Dark Knight",
      image:
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: 8.5,
      year: 2008,
      mediaType: "Movie",
    },
    {
      id: 4,
      title: "Dune",
      image:
        "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      rating: 7.8,
      year: 2021,
      mediaType: "Movie",
    },
    {
      id: 5,
      title: "Oppenheimer",
      image:
        "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      rating: 8.1,
      year: 2023,
      mediaType: "Movie",
    },
  ];

  const popularMovies = trending;

  const popularTV = [
    {
      id: 101,
      title: "Breaking Bad",
      image:
        "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
      rating: 8.9,
      year: 2008,
      mediaType: "TV",
    },
    {
      id: 102,
      title: "Stranger Things",
      image:
        "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      rating: 8.6,
      year: 2016,
      mediaType: "TV",
    },
    {
      id: 103,
      title: "The Last of Us",
      image:
        "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
      rating: 8.6,
      year: 2023,
      mediaType: "TV",
    },
  ];

  const popularAnime = [
    {
      id: 201,
      title: "Attack on Titan",
      image: null,
      rating: 9.0,
      year: 2013,
      mediaType: "Anime",
    },
    {
      id: 202,
      title: "Demon Slayer",
      image: null,
      rating: 8.6,
      year: 2019,
      mediaType: "Anime",
    },
    {
      id: 203,
      title: "Jujutsu Kaisen",
      image: null,
      rating: 8.7,
      year: 2020,
      mediaType: "Anime",
    },
  ];

  // --------------------------------------------------
  // NAVIGATION
  // --------------------------------------------------

  const handleMediaClick = (item) => {
    if (!item?.id) return;

    switch (item.mediaType?.toLowerCase()) {
      case "movie":
        navigate(`/movies/${item.id}`);
        break;

      case "tv":
      case "tv show":
        navigate(`/tv/${item.id}`);
        break;

      case "anime":
        navigate(`/anime/${item.id}`);
        break;

      default:
        break;
    }
  };

  const handleFeaturedDetails = () => {
    handleMediaClick(featured);
  };

  // --------------------------------------------------
  // WATCHLIST
  // --------------------------------------------------

  const handleAddWatchlist = (item) => {
    // Backend integration comes later.
    console.log("Add to watchlist:", item);
  };

  return (
    <div className="bg-black text-white">

      {/* Featured content */}
      <HeroBanner
        title={featured.title}
        description={featured.description}
        backdrop={featured.backdrop}
        rating={featured.rating}
        year={featured.year}
        genres={featured.genres}
        mediaType={featured.mediaType}
        onViewDetails={handleFeaturedDetails}
        onWatchlist={() => handleAddWatchlist(featured)}
      />

      {/* Content rows */}
      <div className="-mt-4 pb-10">

        <MediaRow
          title="Trending Now"
          items={trending}
          onItemClick={handleMediaClick}
          onAddWatchlist={handleAddWatchlist}
        />

        <MediaRow
          title="Popular Movies"
          items={popularMovies}
          onItemClick={handleMediaClick}
          onAddWatchlist={handleAddWatchlist}
          onViewAll={() => navigate(ROUTES.MOVIES)}
        />

        <MediaRow
          title="Popular TV Shows"
          items={popularTV}
          onItemClick={handleMediaClick}
          onAddWatchlist={handleAddWatchlist}
          onViewAll={() => navigate(ROUTES.TV_SHOWS)}
        />

        <MediaRow
          title="Popular Anime"
          items={popularAnime}
          onItemClick={handleMediaClick}
          onAddWatchlist={handleAddWatchlist}
          onViewAll={() => navigate(ROUTES.ANIME)}
        />

        <MediaRow
          title="Recommended For You"
          items={trending}
          onItemClick={handleMediaClick}
          onAddWatchlist={handleAddWatchlist}
        />

      </div>

    </div>
  );
}

export default Home;