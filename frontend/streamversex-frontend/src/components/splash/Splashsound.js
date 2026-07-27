import { useEffect } from "react";

/**
 * Plays a one-shot splash sound effect on mount.
 * - Warns (instead of failing silently) if autoplay-with-sound is blocked
 * - Cleans up (pauses/resets) if the component unmounts early
 *
 * @param {string} src - imported audio file (e.g. import splashSound from ".../splash-sound.mp3")
 * @param {object} [options]
 * @param {number} [options.volume=0.6] - 0 to 1
 */
function useSplashSound(src, { volume = 0.6 } = {}) {
  useEffect(() => {
    const audio = new Audio(src);
    audio.volume = volume;

    audio.play().catch((err) => {
      // Autoplay-with-sound blocked by the browser (no prior user
      // gesture) — shouldn't happen now that SplashLogo only mounts
      // after the "Tap to enter" click in Splash.jsx.
      console.warn("Splash sound failed to play:", err);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [src, volume]);
}

export default useSplashSound;