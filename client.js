import { render, hydrate } from "solid-js/web";
// import { createComponent } from "solid-js/web";
import h from "solid-js/h";

import StaticHtml from "./StaticHtml";

export default function renderComponent({
  Component,
  target,
  props,
  children,
  isSSR,
}) {
  const element = h(Component, props, h(StaticHtml, { value: children }));
  if (isSSR) {
    hydrate(() => element, target);
  } else {
    render(() => element, target);
  }
}
