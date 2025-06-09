// rollup.config.js
import {readFileSync} from 'fs';
import terser from '@rollup/plugin-terser'; // Import the terser plugin

// --- Dynamic Header Generation ---
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const {homepage, version, author} = pkg;

const parsedAuthor =
  typeof author === 'string' ? author.split('<')[0].trim() : author && author.name ? author.name : 'Unknown Author';

const currentYear = new Date().getFullYear();

// Define your comment block here.
// Key Change: Starts with `/*!` instead of `/**`
const headerComment = `/*!
 * ca-letteranimation.js - Letter, word, and line animation enhancements
 * Part of: ${homepage}
 * Version: ${version}
 *
 * Author: ${parsedAuthor}
 * LinkedIn: https://www.linkedin.com/in/shafayetul/
 * Email: hello@cssanimation.io
 * GitHub: https://github.com/yesiamrocks/cssanimation.io
 *
 * Title: A lightweight, CSS-only enhancement script for text animations.
 * Description: Provides dynamic letter-by-letter, word-by-word, and line-by-line animation
 * capabilities, enhancing HTML elements with customizable text effects via HTML attributes.
 *
 * © ${currentYear} ${parsedAuthor} – All rights reserved.
 */`;

// --- Rollup Configuration ---
export default {
  input: 'src/ca-letteranimation.js', // Your main JavaScript source file
  output: [
    // Un-minified output
    {
      file: 'dist/ca-letteranimation.js',
      format: 'umd',
      name: 'CALetterAnimation',
      banner: headerComment, // This adds the banner (now a bang comment)
    }, // Minified output
    {
      file: 'dist/ca-letteranimation.min.js',
      format: 'umd',
      name: 'CALetterAnimation',
      banner: headerComment, // This adds the banner (now a bang comment)
      plugins: [
        terser({
          compress: {
            // drop_console: true, // Optional
          },
          output: {
            // "some" will reliably preserve comments starting with `/*!`
            comments: 'some',
          },
        }),
      ],
    },
  ],
};
