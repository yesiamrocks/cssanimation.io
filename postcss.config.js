module.exports = {
  plugins: [
    // Adds vendor prefixes based on .browserslistrc
    require("autoprefixer"),

    // Polyfills modern CSS features based on browser support
    require("postcss-preset-env")(),
  ],
};
