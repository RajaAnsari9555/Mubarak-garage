import { useEffect, useState } from 'react';

/**
 * Types out `text` character by character once `start` is true.
 * Returns the currently displayed string.
 */
export function useTypewriter(text, speed = 55, start = false) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!start) return;
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [start, text, speed]);

  return displayed;
}
