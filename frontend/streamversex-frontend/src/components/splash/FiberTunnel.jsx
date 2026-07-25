import { motion } from "motion/react";

const COLORS = [
  "#6f0008",
  "#95000c",
  "#b20710",
  "#e50914",
  "#ff2532",
  "#ff3b46",
  "#ff4f3d",
  "#ff6932",
  "#f5365c",
  "#e91e63",
  "#d81b60",
  "#c2185b",
  "#ad1bb8",
  "#8e24aa",
  "#7b1fa2",
  "#673ab7",
  "#5e35b1",
  "#3949ab",
  "#304ffe",
  "#2962ff",
  "#2979ff",
  "#448aff",
];

const FIBER_COUNT = 110;

const fibers = Array.from({ length: FIBER_COUNT }, (_, index) => {
  const position = index / (FIBER_COUNT - 1);

  return {
    id: index,

    left: position * 100,

    width: 0.8 + ((index * 17) % 5) * 0.55,

    color: COLORS[(index * 7) % COLORS.length],

    delay: ((index * 13) % 17) / 100,

    brightness: 0.75 + ((index * 11) % 11) / 10,

    xOffset: ((index * 23) % 21) - 10,
  };
});

function FiberTunnel() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {fibers.map((fiber) => (
        <motion.span
          key={fiber.id}
          className="absolute left-1/2 top-1/2 block"
          style={{
            width: `${fiber.width}px`,
            height: "120vh",

            background: `linear-gradient(
              to bottom,
              transparent 0%,
              ${fiber.color} 20%,
              ${fiber.color} 80%,
              transparent 100%
            )`,

            filter: `
              brightness(${fiber.brightness})
              blur(${fiber.width > 2 ? 0.5 : 0}px)
            `,

            boxShadow: `
              0 0 4px ${fiber.color},
              0 0 10px ${fiber.color}
            `,

            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
          initial={{
            x: `${fiber.xOffset}px`,
            y: "-50%",

            opacity: 0,

            scaleX: 0.15,
            scaleY: 0.08,
          }}
          animate={{
            x: [
              `${fiber.xOffset}px`,

              `${fiber.xOffset * 2}px`,

              `calc(${
                fiber.left - 50
              }vw)`,
            ],

            opacity: [
              0,
              0,
              0.9,
              1,
              0,
            ],

            scaleX: [
              0.15,
              0.25,
              0.7,
              2.8,
              7,
            ],

            scaleY: [
              0.08,
              0.3,
              1,
              3.5,
              10,
            ],
          }}
          transition={{
            duration: 2.05,

            delay: 1.55 + fiber.delay,

            times: [
              0,
              0.18,
              0.42,
              0.76,
              1,
            ],

            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}

      {/* center flash */}
      <motion.div
        className="absolute left-1/2 top-1/2
                   h-[40vh] w-[12vw]
                   -translate-x-1/2 -translate-y-1/2
                   bg-red-500/20 blur-[60px]"
        initial={{
          opacity: 0,
          scale: 0.2,
        }}
        animate={{
          opacity: [0, 0, 0.8, 0],
          scale: [0.2, 0.2, 1.2, 5],
        }}
        transition={{
          duration: 2.1,
          times: [0, 0.55, 0.72, 1],
          ease: "easeOut",
        }}
      />
    </div>
  );
}

export default FiberTunnel;