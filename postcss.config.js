const prefixer = require("postcss-prefix-selector");

module.exports = {
  plugins: [
    require("postcss-preset-env")(),
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
    require("cssnano")(),
  ],
};
