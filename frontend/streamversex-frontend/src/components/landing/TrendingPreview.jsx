import MediaCard from "../common/MediaCard";

const trendingContent = [
  {
    id: 1,
    title: "Shadow Protocol",
    year: "2026",
    rating: "8.7",
    type: "Movie",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Beyond Earth",
    year: "2025",
    rating: "9.1",
    type: "TV Series",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Neon City",
    year: "2026",
    rating: "8.5",
    type: "Anime",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "The Last Signal",
    year: "2025",
    rating: "8.9",
    type: "Movie",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Dark Horizon",
    year: "2026",
    rating: "8.3",
    type: "TV Series",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "Crimson Sky",
    year: "2025",
    rating: "9.0",
    type: "Anime",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
  },
];

function TrendingPreview() {
  return (
    <section
      className="
        relative overflow-hidden
        bg-black
        py-[clamp(3.5rem,7vw,7rem)]
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-[-15%] top-[-20%]
          h-[500px] w-[500px]
          rounded-full
          bg-red-900/10
          blur-[140px]
        "
      />

      <div
        className="
          relative mx-auto
          w-full max-w-[1600px]
          px-[clamp(1rem,4vw,4rem)]
        "
      >
        {/* Header */}

        <div
          className="
            mb-[clamp(1.5rem,3vw,2.5rem)]
            flex items-end
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                mb-2
                text-[clamp(0.65rem,1vw,0.8rem)]
                font-bold uppercase
                tracking-[0.2em]
                text-[#e50914]
              "
            >
              Explore
            </p>

            <h2
              className="
                text-[clamp(1.6rem,3vw,2.75rem)]
                font-black
                tracking-tight
                text-white
              "
            >
              Trending Now
            </h2>

            <p
              className="
                mt-2
                max-w-xl
                text-[clamp(0.85rem,1.2vw,1rem)]
                leading-relaxed
                text-white/50
              "
            >
              Discover movies, series and anime everyone
              is talking about.
            </p>
          </div>

          <button
            type="button"
            className="
              hidden shrink-0
              text-sm font-semibold
              text-white/60
              transition-colors
              hover:text-white
              sm:block
            "
          >
            View All →
          </button>
        </div>

        {/* Cards */}

        <div
          className="
            flex gap-[clamp(0.75rem,1.5vw,1.25rem)]
            overflow-x-auto
            pb-4
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {trendingContent.map((item) => (
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

        {/* Mobile View All */}

        <button
          type="button"
          className="
            mt-5
            text-sm font-semibold
            text-white/60
            transition-colors
            hover:text-white
            sm:hidden
          "
        >
          View All →
        </button>
      </div>
    </section>
  );
}

export default TrendingPreview;