import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '../src/animations');
const destDir = path.join(__dirname, '../dist/modules');

const skipFiles = ['ca__base.css', 'ca__vars.css', 'cssanimation-index.css'].map((name) => name.toLowerCase()); // normalize for comparison

const classPrefix = 'ca__fx-';

// Read shared files
const baseCSS = fs.readFileSync(path.join(srcDir, 'ca__base.css'), 'utf-8');
const varsCSS = fs.readFileSync(path.join(srcDir, 'ca__vars.css'), 'utf-8');
const prefixContent = `${baseCSS}\n\n${varsCSS}\n\n`;

// Ensure output folder
fs.mkdirSync(destDir, {recursive: true});

// Class name prefixer
function prefixClassNames(content) {
  return content.replace(/\.([a-zA-Z0-9_-]+)/g, (match, className) => {
    if (className.startsWith('ca__')) return `.${className}`;
    return `.ca__fx-${className}`;
  });
}

// Build all animation files
fs.readdirSync(srcDir).forEach((file) => {
  if (file.endsWith('.css') && !skipFiles.includes(file.toLowerCase())) {
    const srcPath = path.join(srcDir, file);
    const original = fs.readFileSync(srcPath, 'utf-8');

    const withPrefixed = prefixClassNames(original);
    const finalOutput = prefixContent + withPrefixed;

    const destPath = path.join(destDir, file);
    fs.writeFileSync(destPath, finalOutput);
    console.log(`✅ Built: ${file}`);
  } else {
    console.log(`⏭️ Skipped: ${file}`);
  }
});
