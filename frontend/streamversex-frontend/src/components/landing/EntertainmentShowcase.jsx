import { Link } from "react-router-dom";
import MediaCard from "../common/MediaCard";
import { ROUTES } from "../../routes/routeConstants";

const categories = [
  {
    id: "movies",
    eyebrow: "Cinema",
    title: "Popular Movies",
    description: "Blockbusters, hidden gems and unforgettable stories.",
    route: ROUTES.MOVIES,

    items: [
      {
        id: 1,
        title: "Midnight Protocol",
        year: "2026",
        rating: "8.8",
        type: "Movie",
        image:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 2,
        title: "Red Horizon",
        year: "2025",
        rating: "8.4",
        type: "Movie",
        image:
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 3,
        title: "Beyond Tomorrow",
        year: "2026",
        rating: "9.0",
        type: "Movie",
        image:
          "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 4,
        title: "Lost Frequency",
        year: "2025",
        rating: "8.6",
        type: "Movie",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },

  {
    id: "tv",
    eyebrow: "Binge Worthy",
    title: "TV Shows",
    description: "Stories that keep you coming back for another episode.",
    route: ROUTES.TV_SHOWS,

    items: [
      {
        id: 5,
        title: "After Dark",
        year: "2026",
        rating: "9.2",
        type: "TV Series",
        image:
          "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 6,
        title: "The Signal",
        year: "2025",
        rating: "8.9",
        type: "TV Series",
        image:
          "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 7,
        title: "Unknown",
        year: "2026",
        rating: "8.7",
        type: "TV Series",
        image:
          "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 8,
        title: "The Last Chapter",
        year: "2025",
        rating: "8.5",
        type: "TV Series",
        image:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },

  {
    id: "anime",
    eyebrow: "Discover",
    title: "Anime",
    description: "Explore incredible worlds, characters and adventures.",
    route: ROUTES.ANIME,

    items: [
      {
        id: 9,
        title: "Neon Soul",
        year: "2026",
        rating: "9.3",
        type: "Anime",
        image:
          "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 10,
        title: "Crimson Moon",
        year: "2025",
        rating: "9.0",
        type: "Anime",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 11,
        title: "Zero Dimension",
        year: "2026",
        rating: "8.8",
        type: "Anime",
        image:
          "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 12,
        title: "Shadow Blade",
        year: "2025",
        rating: "9.1",
        type: "Anime",
        image:
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd4297?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
];

function EntertainmentShowcase() {
  return (
    <section
      className="
        relative overflow-hidden bg-black
        py-[clamp(3rem,7vw,7rem)]
      "
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-[-15%] top-[20%]
          h-[clamp(20rem,40vw,45rem)]
          w-[clamp(20rem,40vw,45rem)]
          rounded-full
          bg-red-950/15
          blur-[150px]
        "
      />

      <div
        className="
          relative mx-auto w-full max-w-[1600px]
          px-[clamp(1rem,4vw,4rem)]
        "
      >
        {/* Main heading */}
        <div className="mb-[clamp(2.5rem,6vw,5rem)] max-w-3xl">
          <p
            className="
              mb-3 text-[clamp(0.7rem,1vw,0.85rem)]
              font-bold uppercase
              tracking-[0.22em]
              text-[#e50914]
            "
          >
            One Universe
          </p>

          <h2
            className="
              text-[clamp(2rem,4.5vw,4.5rem)]
              font-black leading-[1.05]
              tracking-[-0.03em]
              text-white
            "
          >
            Everything you love.
            <span className="text-white/35">
              {" "}One place.
            </span>
          </h2>

          <p
            className="
              mt-4 max-w-2xl
              text-[clamp(0.9rem,1.3vw,1.1rem)]
              leading-relaxed text-white/55
            "
          >
            Explore movies, television and anime without
            jumping between different platforms.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-[clamp(3.5rem,7vw,6rem)]">
          {categories.map((category) => (
            <div key={category.id}>

              {/* Row header */}
              <div
                className="
                  mb-[clamp(1.25rem,2.5vw,2rem)]
                  flex items-end justify-between gap-5
                "
              >
                <div>
                  <p
                    className="
                      mb-1.5
                      text-[clamp(0.65rem,1vw,0.8rem)]
                      font-bold uppercase
                      tracking-[0.18em]
                      text-[#e50914]
                    "
                  >
                    {category.eyebrow}
                  </p>

                  <h3
                    className="
                      text-[clamp(1.4rem,2.5vw,2.3rem)]
                      font-black text-white
                    "
                  >
                    {category.title}
                  </h3>

                  <p
                    className="
                      mt-1 max-w-xl
                      text-[clamp(0.8rem,1vw,0.95rem)]
                      text-white/45
                    "
                  >
                    {category.description}
                  </p>
                </div>

                <Link
                  to={category.route}
                  className="
                    hidden shrink-0
                    text-sm font-semibold text-white/55
                    transition-colors duration-200
                    hover:text-[#e50914]
                    sm:block
                  "
                >
                  Explore All →
                </Link>
              </div>

              {/* Media row */}
              <div
                className="
                  flex gap-[clamp(0.75rem,1.5vw,1.25rem)]
                  overflow-x-auto pb-4
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                {category.items.map((item) => (
                  <MediaCard
                    key={item.id}
                    title={item.title}
                    image={item.image}
                    year={item.year}
                    rating={item.rating}
                    type={item.type}
                  />
                ))}
              </div>

              {/* Mobile link */}
              <Link
                to={category.route}
                className="
                  mt-3 inline-block
                  text-sm font-semibold text-white/55
                  transition-colors
                  hover:text-[#e50914]
                  sm:hidden
                "
              >
                Explore All →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EntertainmentShowcase;