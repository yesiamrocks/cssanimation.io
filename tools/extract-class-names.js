// tools/extract-class-names.js

// 1. Change `require()` to `import` statements
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url'; // Needed to construct __dirname equivalent for path.resolve

// Helper for __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input files to scan for class names
// 2. Adjust paths to be relative to the project root,
//    then resolve them using path.resolve and __dirname.
const files = [
  path.resolve(__dirname, '../dist/cssanimation.css'),
  path.resolve(__dirname, '../dist/cssanimation-utility.css'),
];

// Section headers for output
const sectionTitles = {
  'cssanimation.css': 'Core Animation Classes',
  'cssanimation-utility.css': 'Utility Classes',
};

// Load grouped class descriptions
const groupedDescPath = path.resolve(__dirname, 'class-descriptions.json');
let groupedDescriptions = {};
try {
  groupedDescriptions = JSON.parse(fs.readFileSync(groupedDescPath, 'utf8'));
} catch (error) {
  // Use console.error for actual errors, warn for non-critical issues
  console.warn('⚠️ Could not load class-descriptions.json. Proceeding without descriptions.');
  // console.error('Error loading class-descriptions.json:', error.message); // More verbose error
}

// 💡 Match `.ca__fx-*`, `.ca__u-*`, `.ca__lt-*`
const generalClassRegex = /\.((ca__fx|ca__u|ca__lt)-[a-zA-Z0-9_-]+)/g;

const discoveredClasses = new Set();

// Step 1: Discover prefixed classes
files.forEach((filePath) => {
  // filePath is already an absolute path from the `files` array
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  while ((match = generalClassRegex.exec(content)) !== null) {
    discoveredClasses.add(match[1]); // Store without dot
  }
});

// Step 2: Group by predefined categories
let output = '# cssanimation.io – Animation Class Reference\n\n';
const utilityGroupNames = [];
const animationGroupNames = [];
const groupedClassSet = new Set();

for (const groupName of Object.keys(groupedDescriptions)) {
  const isUtility = /utility|utilities|control/i.test(groupName);
  if (isUtility) {
    utilityGroupNames.push(groupName);
  } else {
    animationGroupNames.push(groupName);
  }

  // Add to the grouped set
  Object.keys(groupedDescriptions[groupName]).forEach((cls) => {
    groupedClassSet.add(cls);
  });
}

// Step 3: Render grouped sections
[...animationGroupNames, ...utilityGroupNames].forEach((groupName) => {
  const classMap = groupedDescriptions[groupName];
  const included = Object.entries(classMap).filter(([className]) => discoveredClasses.has(className));
  if (included.length) {
    output += `## ${groupName}\n`;
    included.forEach(([className, description]) => {
      output += `- \`${className}\` — ${description}\n`;
    });
    output += '\n';
  }
});

// Step 4: Handle ungrouped matches
for (const filePath of files) {
  const fileName = path.basename(filePath);
  const sectionTitle = sectionTitles[fileName] || fileName;
  // filePath is already an absolute path
  const content = fs.readFileSync(filePath, 'utf8');

  const unmatched = new Set();
  let match;
  while ((match = generalClassRegex.exec(content)) !== null) {
    const className = match[1];
    if (!groupedClassSet.has(className)) {
      unmatched.add(className);
    }
  }

  if (unmatched.size > 0) {
    output += `## ${sectionTitle} (Ungrouped)\n`;
    [...unmatched].sort().forEach((className) => {
      output += `- \`${className}\`\n`;
    });
    output += '\n';
  }
}

// Step 5: GSAP animation listing (from gsap-animation-map.js)
// 3. Convert require to import for commented-out section too, just in case
// const gsapMapPath = path.resolve(__dirname, '../src/gsap-animation-map.js');
// if (fs.existsSync(gsapMapPath)) {
//   const content = fs.readFileSync(gsapMapPath, 'utf8');
//   const gsapClassRegex = /'ca__gx-([a-zA-Z0-9_-]+)'/g;
//   const names = new Set();
//   let match;
//   while ((match = gsapClassRegex.exec(content)) !== null) {
//     names.add(`ca__gx-${match[1]}`);
//   }

//   if (names.size > 0) {
//     output += '## GSAP Data Attribute Animations\n';
//     output +=
//       'Use these with the `ca-gsap` attribute, e.g. `<div ca-gsap=\"FadeIn\">`\n\n';
//     [...names].sort().forEach((name) => {
//       output += `- \`${name}\`\n`;
//     });
//     output += '\n';
//   }
// }

// Step 6: Output file
const outPath = path.resolve(__dirname, '../reference/cssanimation-reference.md'); // Ensure output path is resolved correctly
fs.writeFileSync(outPath, output, 'utf8');
console.log(`✅ Class reference saved to ${outPath}`);
