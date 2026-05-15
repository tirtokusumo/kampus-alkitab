import { useEffect } from 'react';

/**
 * Sets the browser tab title and restores on unmount.
 * @param {string} title - Page-specific title (e.g. "Dashboard")
 * @param {string} [suffix] - Appended suffix (default: "Kampus Alkitab")
 */
const usePageTitle = (title, suffix = 'Kampus Alkitab') => {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | ${suffix}` : suffix;
    return () => {
      document.title = prev;
    };
  }, [title, suffix]);
};

export default usePageTitle;
