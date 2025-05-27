// Import Node.js built-in modules for file system and path handling
import fs from 'fs';
import path from 'path';

// 📁 Define the source animations directory and output map file location
const animationDir = './src/animations';
const outputPath = './src/gsap-animation-map.js';

// 📄 Read all files in the animations directory and filter for .js files only
const files = fs
    .readdirSync(animationDir)
    .filter((file) => file.endsWith('.js'));

// 📦 These arrays will collect our generated import statements and map entries
const imports = [];
const mapEntries = [];

// 🔁 Loop through each animation file to generate imports and map
files.forEach((file) => {
    // Get filename without extension (e.g., 'bounce')
    const base = path.basename(file, '.js');

    // Construct expected function name (e.g., 'animateBounce')
    const funcName = `animate${capitalize(base)}`;

    // 🛡 Read file content to validate the presence of the expected export
    const filePath = path.join(animationDir, file);
    const contents = fs.readFileSync(filePath, 'utf-8');

    // 🚨 Warn if the expected function is not found in the file
    if (!contents.includes(`function ${funcName}`)) {
        console.warn(
            `⚠️  Expected export '${funcName}' not found in '${file}'.\n` +
                `    ➤ Make sure the file exports a function with this name:\n\n` +
                `    export function ${funcName}(el, options = {}) {\n      // ...animation logic\n    }\n`,
        );
    }

    // 📥 Push import line for this animation
    imports.push(`import { ${funcName} } from './animations/${base}.js';`);

    // 📌 Add a key-value pair to the animation map (e.g., 'bounce': animateBounce)
    mapEntries.push(`  'ca__gx-${base}': ${funcName},`);
});

// 🛠 Combine everything into the final output content for the map file
const output = `/**
 * Auto-generated animation map from ./src/animations
 * Run this file before building: npm run generate:map
 * 
 * This file maps animation names (e.g., 'bounce') to exported GSAP functions (e.g., animateBounce).
 * DO NOT EDIT MANUALLY — instead, edit animation files in /src/animations/
 */

${imports.join('\n')}

export const animationMap = {
${mapEntries.join('\n')}
};
`;

// 💾 Write the output to the target file
fs.writeFileSync(outputPath, output, 'utf-8');
console.log(`✅ Generated animation map with ${files.length} entries.`);

// 🧠 Utility function to capitalize the first letter of a string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
