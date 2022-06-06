import { renderToString, ssr, createComponent } from 'solid-js/web';

function check({ toCommonJSModule, componentPath, props, children }) {
  const Component = await toCommonJSModule(componentPath);
  
  if (typeof Component !== 'function') return false;
  const { html } = renderToStaticMarkup(Component, props, children);
  return typeof html === 'string';
}

function server({ toCommonJSModule, componentPath, props, children }) {
  const Component = await toCommonJSModule(componentPath);
  const html = renderToString(() =>
    createComponent(Component, {
      ...props,
      // In Solid SSR mode, `ssr` creates the expected structure for `children`.
      // In Solid client mode, `ssr` is just a stub.
      children: children != null ? ssr(`<astro-fragment>${children}</astro-fragment>`) : children,
    })
  );

  return { html: html, css: "" };
}

export default { check, server };