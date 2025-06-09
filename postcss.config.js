// postcss.config.js

// Change require() to import statements
import fs from 'fs';
import path from 'path'; // Still not directly used, but kept for consistency
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import postcssPrefixSelector from 'postcss-prefix-selector';
import cssnano from 'cssnano';

// Read metadata
// Use import.meta.url for reliable path resolution in ES Modules
const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const {homepage, version, author} = pkg;

// Ensure author parsing is robust
const parsedAuthor =
  typeof author === 'string' ? author.split('<')[0].trim() : author && author.name ? author.name : 'Unknown Author';

const currentYear = new Date().getFullYear();
const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' UTC';

// Header template generator (content only, `/*!` and `*/` will be added by the plugin)
const headerMap = {
  'cssanimation.css': `
* @preserve
* cssanimation.css – Core animation styles and keyframes
* Part of: ${homepage}
* Version: ${version}
* Built: ${timestamp}
*
* Author: ${parsedAuthor}
* LinkedIn: https://www.linkedin.com/in/shafayetul/
* Email: hello@cssanimation.io
* GitHub: https://github.com/yesiamrocks/cssanimation.io
*
* Title: Core Animation Styles and Keyframe Definitions for cssanimation.io.
* Description: Contains the fundamental CSS animation classes, keyframe definitions,
* and essential styling that form the base of the cssanimation.io library.
*
* © ${currentYear} ${parsedAuthor} – All rights reserved.
`,
  'cssanimation-utility.css': `
* @preserve
* cssanimation-utilities.css - Utility classes for enhanced animation control and responsiveness.
* Part of: ${homepage}
* Version: ${version}
* Built: ${timestamp}
*
* Author: ${parsedAuthor}
* LinkedIn: https://www.linkedin.com/in/shafayetul/
* Email: hello@cssanimation.io
* GitHub: https://github.com/yesiamrocks/cssanimation.io
*
* Title: Utility Classes for CSS Animation Control and Responsiveness.
* Description: A collection of helper classes for managing animation duration, delay,
* fill modes, and responsive adjustments, designed to complement core animation styles.
*
* © ${currentYear} ${parsedAuthor} – All rights reserved.
`,
};

const isMinified = process.env.CSS_BUILD === 'min';
const animationExclusions = ['.cssanimation', '.cssanimation span', '.infinite'];
const globalExclusions = [':root'];

// Change module.exports = (ctx) => { ... } to export default (ctx) => { ... }
export default (ctx) => {
  const filename = ctx.file?.basename || '';
  const isAnimation = filename === 'cssanimation.css';
  const isUtility = filename === 'cssanimation-utility.css';

  let prefixPlugin = null;

  if (isAnimation) {
    prefixPlugin = postcssPrefixSelector({
      prefix: '.ca__fx',
      transform: (prefix, selector, prefixed) =>
        selector.startsWith('.') ? selector.replace(/^\./, `${prefix}-`) : prefixed,
      exclude: [...animationExclusions, ...globalExclusions],
    });
  } else if (isUtility) {
    prefixPlugin = postcssPrefixSelector({
      prefix: '.ca__u',
      transform: (prefix, selector, prefixed) =>
        selector.startsWith('.') ? selector.replace(/^\./, `${prefix}-`) : prefixed,
      exclude: globalExclusions,
    });
  }

  const headerContent = headerMap[filename] ? headerMap[filename].trim() : '';

  // Custom PostCSS plugin to ensure @charset is always at the top
  const charsetPlugin = {
    postcssPlugin: 'postcss-charset',
    Once(root) {
      root.walkAtRules('charset', (rule) => rule.remove()); // Remove any existing
      root.prepend({name: 'charset', params: '"UTF-8"', type: 'atrule'}); // Prepend
    },
  };

  // Custom PostCSS plugin to add the header comment
  const headerPlugin = {
    postcssPlugin: 'postcss-header',
    Once(root) {
      if (!headerContent) return;

      root.prepend({
        type: 'comment',
        text: headerContent, // The actual content of the comment
        raws: {
          before: '\n', // Add a newline before the comment block
          left: '!', // This makes it a `/*!` (bang comment)
          right: '', // No extra space before the closing `*/`
        },
      });
    },
  };

  const plugins = [
    // 1. Charset plugin must be the very first plugin to ensure @charset is at the top
    charsetPlugin,
    // 2. Import statements
    postcssImport(),
    // 3. Prefixing based on file type
    ...(prefixPlugin ? [prefixPlugin] : []),
    // 4. PostCSS Preset Env for modern CSS features and autoprefixing
    postcssPresetEnv({
      autoprefixer: {cascade: false},
      features: {'custom-properties': false}, // Set to false if you handle custom properties elsewhere or assume native support
    }),
    // 5. Header plugin: Must run before cssnano if we want to preserve the header
    headerPlugin,
    // 6. CSSNano for minification (only if isMinified)
    ...(isMinified
      ? [
          cssnano({
            preset: [
              'default',
              {
                discardComments: {
                  remove: (comment) => {
                    return !comment.includes('@preserve');
                  },
                },
              },
            ],
          }),
        ]
      : []),
  ];

  console.log(`🎉 cssanimation.io build: ${filename} [minified: ${isMinified ? 'yes' : 'no'}]`);

  return {plugins};
};
