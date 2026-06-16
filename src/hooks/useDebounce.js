import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value` after `delay` ms of no changes.
 * @param {*} value - Value to debounce
 * @param {number} delay - Delay in milliseconds (default 500)
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
