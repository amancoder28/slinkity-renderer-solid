import h from "solid-js/h";

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as h.
 *
 * As a bonus, we can signal to React that this subtree is
 * entirely static and will never change via `shouldComponentUpdate`.
 */

const StaticHtml = ({ value }) => {
  if (!value) return null;
  return h("astro-fragment", {
    value,
  });
};

export default StaticHtml;
