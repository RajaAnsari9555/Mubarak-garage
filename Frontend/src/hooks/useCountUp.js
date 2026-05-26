import { useEffect, useRef, useState } from 'react';

/**
 * Counts from 0 to `target` over `duration` ms once `start` is true.
 * Handles values like "25+", "100%", "500+" — strips suffix, counts the number.
 */
export function useCountUp(rawValue, duration = 1800, start = false) {
  const [display, setDisplay] = useState('0');
  const frameRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    // Parse number and suffix
    const match = String(rawValue).match(/^(\d+)(.*)$/);
    if (!match) { setDisplay(rawValue); return; }
    const target = parseInt(match[1], 10);
    const suffix = match[2];

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(rawValue); // ensure exact final value
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [start, rawValue, duration]);

  return display;
}
