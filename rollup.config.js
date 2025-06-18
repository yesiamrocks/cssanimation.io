// rollup.config.js
import {readFileSync} from 'fs';
import terser from '@rollup/plugin-terser';

// --- Shared Package Info ---
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const {homepage, version, author} = pkg;

const parsedAuthor =
  typeof author === 'string' ? author.split('<')[0].trim() : author && author.name ? author.name : 'Unknown Author';

const currentYear = new Date().getFullYear();

// --- Shared Footer (Common to All Banners) ---
const sharedFooter = `
 * Part of: ${homepage}
 * Version: ${version}
 *
 * Author: ${parsedAuthor}
 * LinkedIn: https://www.linkedin.com/in/shafayetul/
 * Email: hello@cssanimation.io
 * GitHub: https://github.com/yesiamrocks/cssanimation
 *
 * © ${currentYear} ${parsedAuthor} – All rights reserved.
 */`;

// --- Helper: Build Full Banner per Plugin ---
const makeBanner = ({file, title, description}) => `/*!
 * ${file}
 * Title: ${title}
 * Description: ${description}${sharedFooter}`;

// --- Plugin Configurations ---
const plugins = [
  {
    name: 'CALetterAnimation',
    input: 'src/plugins/ca-letteranimation.js',
    output: 'ca-letteranimation',
    title: 'Letter, word, and line animation enhancements',
    description:
      'Provides dynamic letter-by-letter, word-by-word, and line-by-line animation capabilities, enhancing HTML elements with customizable text effects via HTML attributes.',
  },
  {
    name: 'CATrigger',
    input: 'src/plugins/ca-trigger.js',
    output: 'ca-trigger',
    title: 'Trigger-based animation control for HTML elements',
    description: 'Enables animations on user interactions like click, hover, focus, blur using HTML attributes.',
  },
];

// --- Build Config for Each Plugin (minified and unminified) ---
export default plugins.flatMap(({name, input, output, title, description}) => [
  {
    input,
    output: {
      file: `dist/plugins/${output}.js`,
      format: 'umd',
      name,
      banner: makeBanner({
        file: `${output}.js`,
        title,
        description,
      }),
    },
  },
  {
    input,
    output: {
      file: `dist/plugins/${output}.min.js`,
      format: 'umd',
      name,
      banner: makeBanner({
        file: `${output}.min.js`,
        title,
        description,
      }),
    },
    plugins: [
      terser({
        output: {
          comments: 'some',
        },
      }),
    ],
  },
]);
