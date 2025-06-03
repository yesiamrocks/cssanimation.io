const isMinified = process.env.CSS_BUILD === 'min';

const excludedSelectors = ['.cssanimation', '.cssanimation span', '.infinite'];

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-prefix-selector')({
      prefix: '.ca__fx',
      transform: (prefix, selector) => {
        if (excludedSelectors.includes(selector)) return selector;
        if (selector.startsWith('.')) {
          return selector.replace(/^\./, `${prefix}-`);
        }
        return selector;
      },
    }),
    require('postcss-preset-env')({
      features: {
        'custom-properties': false, // ✅ prevent fallback duplication
      },
    }),
    ...(isMinified ? [require('cssnano')()] : []),
  ],
};
