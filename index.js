const pkg = require("./package.json");
const solidPlugin = require("vite-plugin-solid");
const chalk = require("chalk");

const client = `${pkg.name}/client`;
const server = `${pkg.name}/server`;

const nestedDeps = ['solid-js', 'solid-js/web', 'solid-js/store', 'solid-js/html', 'solid-js/h'];

/** @type {import('../slinkity').Renderer} */

module.exports = {
  name: "solid",
  extensions: ["jsx", "tsx"],
  client,
  server,
  injectImportedStyles: true,
  viteConfig() {
    return {
      plugins: [solidPlugin()],
      jsxImportSource: 'solid-js',
      resolve: {
        dedupe: nestedDeps,
      },
      optimizeDeps: {
        include: nestedDeps,
        exclude: ['solid-js/web/server.js'],
      },
      ssr: {
        external: ['babel-preset-solid'],
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              solid: ["solid-js"],
            },
          },
        },
      },
    };
  },
  page({ toCommonJSModule }) {
    return {
      useFormatted11tyData: true,
      async getData(inputPath) {
        const Component = await toCommonJSModule(inputPath);
        if (Component.getProps !== undefined) {
          console.log(
            chalk.yellow(
              `[Warning] The "getProps" function is no longer supported as of v0.6! If you intended to use "getProps" to generate props for "${inputPath}," try using "hydrate.props(...)" instead. You can also avoid hydrating your page to omit "getProps" entirely. See our docs for more: https://slinkity.dev/docs/component-pages-layouts`
            )
          );
        }
        return Component.frontMatter;
      },
    };
  },
};
