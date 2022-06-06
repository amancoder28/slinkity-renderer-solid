const pkg = require("./package.json");
const solidPlugin = require("vite-plugin-solid");
const chalk = require("chalk");

const client = `${pkg.name}/client`;
const server = `${pkg.name}/server`;

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
      optimizeDeps: {
        include: [client, "solid-js"],
        exclude: [server],
      },
      resolve: {
        dedupe: ["solid-js"],
      },
      ssr: {
        external: ["solid-js/web/server.js"],
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              react: ["solid-js"],
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
