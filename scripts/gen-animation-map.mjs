import fs from 'fs';
import path from 'path';

const animationsDir = path.resolve('./src/animations');
const outputFile = path.resolve('./src/generated-animation-map.js');

const files = fs
    .readdirSync(animationsDir)
    .filter((file) => file.endsWith('.js'));

let imports = '';
let mapEntries = '';

for (const file of files) {
    const base = path.basename(file, '.js');
    const funcName = `animate${base.charAt(0).toUpperCase() + base.slice(1)}`;
    imports += `import { ${funcName} } from './animations/${base}.js';\n`;
    mapEntries += `  "${base}": ${funcName},\n`;
}

const output = `${imports}
export const animationMap = {
${mapEntries}};
`;

fs.writeFileSync(outputFile, output);
console.log(
    `✅ Generated animation map with ${files.length} entries at ${outputFile}`,
);
