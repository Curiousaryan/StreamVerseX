import { motion, useReducedMotion } from "motion/react";

import xLogo from "../../assets/logos/streamversex-x.png";
import FiberTunnel from "./FiberTunnel";

function SplashLogo({ onAnimationComplete }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2,
          times: [0, 0.15, 0.8, 1],
        }}
        onAnimationComplete={onAnimationComplete}
      >
        <h1 className="text-3xl font-black tracking-[0.1em] text-[#e50914] sm:text-5xl">
          STREAMVERSEX
        </h1>
      </motion.div>
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black"
      style={{ perspective: "1200px" }}
    >
      {/* ========================================
          SUBTLE BACKGROUND GLOW
      ======================================== */}

      <motion.div
        className="
          pointer-events-none absolute left-1/2 top-1/2 z-0
          h-[380px] w-[380px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full bg-red-600/[0.08]
          blur-[120px]
        "
        initial={{
          opacity: 0,
          scale: 0.6,
        }}
        animate={{
          opacity: [0, 0.7, 0.45, 0],
          scale: [0.6, 1, 1.3, 2.5],
        }}
        transition={{
          duration: 2.65,
          times: [0, 0.22, 0.65, 1],
          ease: "easeOut",
        }}
      />

      {/* ========================================
          X LOGO

          Reveal → Hold → Creep → Fly-through
      ======================================== */}

      <motion.img
        src={xLogo}
        alt="StreamVerseX"
        draggable="false"
        className="
          absolute z-20
          w-[240px] select-none
          sm:w-[290px]
          md:w-[340px]
          lg:w-[370px]
        "
        style={{
          transformOrigin: "center center",
          willChange: "transform, opacity, filter",
        }}
        initial={{
          opacity: 0,
          scale: 0.82,
          filter: "brightness(0.45) blur(5px)",
        }}
        animate={{
          opacity: [
            0,
            1,
            1,
            1,
            1,
            1,
            0,
          ],

          scale: [
            0.82,

            // reveal
            1,

            // hold
            1,

            // almost invisible creep
            1.03,

            // camera starts moving
            1.18,

            // acceleration
            3.2,

            // fly through
            26,
          ],

          filter: [
            "brightness(0.45) blur(5px)",

            "brightness(1) blur(0px)",

            "brightness(1) blur(0px)",

            "brightness(1.03) blur(0px)",

            "brightness(1.12) blur(0px)",

            "brightness(1.5) blur(1px)",

            "brightness(2.1) blur(7px)",
          ],
        }}
        transition={{
          duration: 2.75,

          times: [
            0,
            0.14,
            0.47,
            0.61,
            0.72,
            0.86,
            1,
          ],

          ease: [0.76, 0, 0.24, 1],
        }}
      />

      {/* ========================================
          FIBER TUNNEL

          Starts during the final logo zoom.
      ======================================== */}

      <motion.div
        className="pointer-events-none absolute inset-0 z-30"
        initial={{
          opacity: 0,
          scale: 0.92,
        }}
        animate={{
          opacity: [
            0,
            0,
            0.25,
            1,
            1,
            0,
          ],

          scale: [
            0.92,
            0.92,
            0.96,
            1,
            1.04,
            1.1,
          ],
        }}
        transition={{
          duration: 3.65,

          times: [
            0,
            0.53,
            0.61,
            0.7,
            0.9,
            1,
          ],

          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <FiberTunnel />
      </motion.div>

      {/* ========================================
          VIGNETTE

          Gives the tunnel more depth.
      ======================================== */}

      <div
        className="pointer-events-none absolute inset-0 z-[35]"
        style={{
          background:
            "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* ========================================
          BLACKOUT
      ======================================== */}

      <motion.div
        className="pointer-events-none absolute inset-0 z-40 bg-black"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: [
            0,
            0,
            0,
            1,
          ],
        }}
        transition={{
          duration: 3.7,
          times: [0, 0.78, 0.9, 1],
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* ========================================
          WORDMARK
      ======================================== */}

      <motion.h1
        className="
          absolute z-50 whitespace-nowrap
          text-2xl font-black
          text-[#e50914]
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
        "
        style={{
          willChange: "transform, opacity, filter, letter-spacing",
        }}
        initial={{
          opacity: 0,
          scale: 0.985,
          letterSpacing: "0.16em",
          filter: "blur(4px)",
        }}
        animate={{
          opacity: [
            0,
            0,
            1,
            1,
            1,
            0,
          ],

          scale: [
            0.985,
            0.985,
            1,
            1,
            1,
            1.015,
          ],

          letterSpacing: [
            "0.16em",
            "0.16em",
            "0.11em",
            "0.085em",
            "0.085em",
            "0.085em",
          ],

          filter: [
            "blur(4px)",
            "blur(4px)",
            "blur(0px)",
            "blur(0px)",
            "blur(0px)",
            "blur(2px)",
          ],
        }}
        transition={{
          duration: 5,

          times: [
            0,
            0.72,
            0.77,
            0.84,
            0.93,
            1,
          ],

          ease: [0.4, 0, 0.2, 1],
        }}
        onAnimationComplete={onAnimationComplete}
      >
        STREAMVERSEX
      </motion.h1>
    </div>
  );
}

export default SplashLogo;