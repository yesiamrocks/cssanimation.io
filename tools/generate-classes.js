// tools/generate-classes.js

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url'; // Required for __dirname equivalent in ESM

// Get __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssPath = path.resolve(__dirname, '../dist/cssanimation.css'); // Adjust path relative to this script
const outputPath = path.resolve(__dirname, '../docs/animationClasses.js'); // Adjust path for where you want to save

async function generateAnimationClasses() {
  try {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    const regex = /\.ca__fx-([a-zA-Z0-9_-]+)/g;
    let match;
    const animationClasses = new Set();

    while ((match = regex.exec(cssContent)) !== null) {
      animationClasses.add(`ca__fx-${match[1]}`);
    }

    const sortedClasses = Array.from(animationClasses).sort();
    // Export the array directly
    const jsContent = `export const animationClasses = ${JSON.stringify(sortedClasses)};\n`;

    fs.writeFileSync(outputPath, jsContent, 'utf8');
    console.log('Animation classes generated successfully!');
  } catch (error) {
    console.error('Error generating animation classes:', error);
    // Fallback for build failure
    const defaultClasses = [
      'ca__fx-FadeIn',
      'ca__fx-MoveFromTop',
      'ca__fx-MoveFromBottom',
      'ca__fx-MoveFromLeft',
      'ca__fx-MoveFromRight',
      'ca__fx-RotateIn',
      'ca__fx-FlipInX',
      'ca__fx-FlipInY',
      'ca__fx-ZoomIn',
      'ca__fx-BounceInTop',
      'ca__fx-LightSpeedIn',
      'ca__fx-RollIn',
      'ca__fx-JackInTheBox',
      'ca__fx-Flash',
      'ca__fx-Pulse',
      'ca__fx-RubberBand',
      'ca__fx-ShakeX',
      'ca__fx-Swing',
      'ca__fx-Tada',
      'ca__fx-Wobble',
      'ca__fx-Jello',
    ];
    const jsContent = `export const animationClasses = ${JSON.stringify(defaultClasses)};\n`;
    fs.writeFileSync(outputPath, jsContent, 'utf8');
    console.warn('Generated default classes as a fallback.');
  }
}

// Call the async function
generateAnimationClasses();
