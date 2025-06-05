const path = require('path');
const postcssImport = require('postcss-import');
const postcssPrefixSelector = require('postcss-prefix-selector');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

const isMinified = process.env.CSS_BUILD === 'min';

// Shared exclusions for the animation file
const animationExclusions = ['.cssanimation', '.cssanimation span', '.infinite'];

// Add ':root' to a general exclusions list for all prefixing instances
const globalExclusions = [':root'];

module.exports = (ctx) => {
  const inputFile = ctx.file;
  const inputName = inputFile && inputFile.basename ? inputFile.basename : '';

  const isAnimation = inputName === 'cssanimation.css';
  const isUtility = inputName === 'cssanimation-utility.css';

  let prefixPlugin = null;

  if (isAnimation) {
    prefixPlugin = postcssPrefixSelector({
      prefix: '.ca__fx',
      transform: (prefix, selector, prefixedSelector) => {
        // We're now using the 'exclude' option for exclusions,
        // so this check becomes less critical here if it's in 'exclude'
        // but can remain for any specific transform logic not handled by 'exclude'.
        // However, if something is in 'exclude', it won't even reach transform usually.
        if (selector.startsWith('.')) {
          return selector.replace(/^\./, `${prefix}-`);
        }
        return prefixedSelector;
      },
      // Combine animation-specific exclusions with global exclusions
      exclude: [...animationExclusions, ...globalExclusions],
    });
  } else if (isUtility) {
    prefixPlugin = postcssPrefixSelector({
      prefix: '.ca__u',
      transform: (prefix, selector, prefixedSelector) => {
        if (selector.startsWith('.')) {
          return selector.replace(/^\./, `${prefix}-`);
        }
        return prefixedSelector;
      },
      // Just use global exclusions for utility file
      exclude: globalExclusions,
    });
  }

  const plugins = [
    postcssImport,
    ...(prefixPlugin ? [prefixPlugin] : []),
    postcssPresetEnv({features: {'custom-properties': false}}),
    ...(isMinified ? [cssnano()] : []),
  ];

  return {plugins};
};
