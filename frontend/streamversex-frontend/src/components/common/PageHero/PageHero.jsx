function PageHero({
  badge,
  title,
  description,
  total,
  totalLabel,
  stats = [],
}) {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-gradient-to-br
        from-zinc-900
        via-[#111]
        to-[#050505]
        p-8
        shadow-2xl
      "
    >
      {/* Background */}

      <div
        className="
          absolute
          -right-24
          -top-24
          h-80
          w-80
          rounded-full
          bg-red-600/10
          blur-3xl
        "
      />

      <div className="relative z-10">

        {/* Header */}

        <div
          className="
            flex
            flex-col
            gap-10

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Left */}

          <div className="max-w-3xl">

            {badge && (
              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-red-600/30
                  bg-red-600/10
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wider
                  text-red-400
                "
              >
                {badge}
              </span>
            )}

            <h1
              className="
                mt-6
                text-5xl
                font-black
                tracking-tight
                text-white

                lg:text-6xl
              "
            >
              {title}
            </h1>

            <p
              className="
                mt-5
                max-w-2xl
                text-lg
                leading-8
                text-gray-400
              "
            >
              {description}
            </p>

          </div>

          {/* Right */}

          <div
            className="
              flex
              h-48
              w-48
              flex-col
              items-center
              justify-center
              rounded-full
              border
              border-red-600/30
              bg-red-600/10
              backdrop-blur-md

              transition-all
              duration-500

              hover:scale-105
              hover:border-red-600
            "
          >

            <h2
              className="
                text-6xl
                font-black
                text-white
              "
            >
              {total}
            </h2>

            <p
              className="
                mt-2
                text-gray-400
              "
            >
              {totalLabel}
            </p>

          </div>

        </div>

        {/* Statistics */}

        {!!stats.length && (

          <div
            className="
              mt-12

              grid

              gap-6

              md:grid-cols-2

              xl:grid-cols-4
            "
          >

            {stats.map((stat) => {

              const Icon = stat.icon;

              return (

                <div
                  key={stat.label}
                  className="
                    rounded-2xl

                    border

                    border-zinc-800

                    bg-zinc-900

                    p-6

                    transition-all

                    duration-300

                    hover:-translate-y-1

                    hover:border-red-600

                    hover:bg-zinc-800
                  "
                >

                  <div className="flex items-center gap-3">

                    <Icon
                      size={22}
                      className="text-red-500"
                    />

                    <span
                      className="
                        font-semibold

                        text-white
                      "
                    >
                      {stat.label}
                    </span>

                  </div>

                  <h3
                    className="
                      mt-5

                      text-4xl

                      font-black

                      text-white
                    "
                  >
                    {stat.value}
                  </h3>

                  {stat.subtitle && (

                    <p
                      className="
                        mt-2

                        text-sm

                        text-gray-500
                      "
                    >
                      {stat.subtitle}
                    </p>

                  )}

                </div>

              );

            })}

          </div>

        )}

      </div>

    </section>
  );
}

export default PageHero;