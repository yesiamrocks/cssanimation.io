const prefixer = require("postcss-prefix-selector");

module.exports = {
  plugins: [
    // Adds vendor prefixes based on .browserslistrc
    require("autoprefixer"),

    // Polyfills modern CSS features based on browser support
    require("postcss-preset-env")(),

    // Adds custom prefix to class names
    prefixer({
      prefix: ".ca__",
      transform: (prefix, selector, prefixedSelector) => {
        if (
          selector.startsWith("html") ||
          selector.startsWith("body") ||
          selector.includes("@")
        ) {
          return selector;
        }
        return prefixedSelector;
      },
    }),

    // Minifies final CSS output
    require("cssnano")(),
  ],
};
