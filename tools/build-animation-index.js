// tools/build-animation-index.js

// 1. Change `require()` to `import` statements
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url'; // Needed to construct __dirname equivalent

// 2. Define __filename and __dirname equivalents for path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 3. Adjust all path.resolve calls to use the new __dirname
const animationsDir = path.resolve(__dirname, '../src/animations');
const outputFile = path.resolve(animationsDir, 'cssanimation-index.css');

// All CSS files in the folder
let files = fs.readdirSync(animationsDir).filter((file) => file.endsWith('.css') && file !== 'cssanimation-index.css');

// Always put these at the top (if they exist)
const pinnedFiles = ['ca__vars.css', 'ca__base.css'];
const pinnedImports = pinnedFiles.filter((f) => files.includes(f));
files = files.filter((f) => !pinnedFiles.includes(f));

// Sort remaining files
files.sort();

// Final list: pinned files first, then sorted others
const allImports = [...pinnedImports, ...files];

// Build CSS content
const imports = allImports.map((file) => `@import './${file}';`).join('\n');

// 4. Adjust fs.writeFileSync to use the resolved output path
fs.writeFileSync(outputFile, imports + '\n');
console.log(`✅ Generated cssanimation-index.css with ${allImports.length} imports.`);
