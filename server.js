// import { createComponent } from "solid-js/web";
import h from "solid-js/h";

import { renderToStringAsync, renderToString } from "solid-js/web";
import StaticHtml from "./StaticHtml";

export default async function server({
  toCommonJSModule,
  componentPath,
  props,
  children,
  loader,
}) {
  const Component = await toCommonJSModule(componentPath);
  const vnode = h(
    Component.default,
    { props },
    h(StaticHtml, { value: children })
  );

  if (!loader || loader === "none") {
    const html = await renderToStringAsync(() => vnode);
    return { html, css: "" };
  } else {
    const html = renderToString(() => vnode);
    return { html, css: "" };
  }
}
