const fs = require('fs');
const path = require('path');

// Input files to scan
const files = ['dist/cssanimation.css', 'dist/cssanimation-utility.css'];

// Optional section headers
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
    console.warn('⚠️ Could not load class-descriptions.json');
}

// Regex to capture .ca__ prefixed classes
const generalClassRegex = /(?:\.)(ca__[a-zA-Z0-9_-]+)/g;
const discoveredClasses = new Set();

// Step 1: Discover classes
files.forEach((filePath) => {
    const absPath = path.resolve(filePath);
    const content = fs.readFileSync(absPath, 'utf8');
    let match;
    while ((match = generalClassRegex.exec(content)) !== null) {
        discoveredClasses.add(match[1]); // Store without dot
    }
});

// Step 2: Grouping logic
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

    // Collect all class names to prevent duplicate rendering
    Object.keys(groupedDescriptions[groupName]).forEach((cls) => {
        groupedClassSet.add(cls);
    });
}

// Step 3: Render grouped classes
[...animationGroupNames, ...utilityGroupNames].forEach((groupName) => {
    const classMap = groupedDescriptions[groupName];
    const included = Object.entries(classMap).filter(([className]) =>
        discoveredClasses.has(className),
    );
    if (included.length) {
        output += `## ${groupName}\n`;
        included.forEach(([className, description]) => {
            output += `- \`${className}\` — ${description}\n`;
        });
        output += '\n';
    }
});

// Step 4: Render ungrouped class names
for (const filePath of files) {
    const fileName = path.basename(filePath);
    const sectionTitle = sectionTitles[fileName] || fileName;
    const absPath = path.resolve(filePath);
    const content = fs.readFileSync(absPath, 'utf8');

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
        Array.from(unmatched)
            .sort()
            .forEach((className) => {
                output += `- \`${className}\`\n`;
            });
        output += '\n';
    }
}

// Step 5: Add GSAP data attribute values based on file names
const animationsDir = path.resolve(__dirname, '../src/animations');
if (fs.existsSync(animationsDir)) {
    const gsapAnimationFiles = fs
        .readdirSync(animationsDir)
        .filter((f) => f.endsWith('.js'));

    const gsapAnimationNames = gsapAnimationFiles
        .map((f) => path.basename(f, '.js'))
        .sort();

    if (gsapAnimationNames.length > 0) {
        output += '## GSAP Data Attribute Animations\n';
        output +=
            'These values can be used with the `ca-gsap` attribute, e.g. `<div ca-gsap="bounce">`.\n\n';
        gsapAnimationNames.forEach((name) => {
            output += `- \`${name}\`\n`;
        });
        output += '\n';
    }
}

// Step 6: Save file
const outPath = './docs/cssanimation-reference.md';
fs.writeFileSync(outPath, output, 'utf8');
console.log(
    `✅ Class reference with grouped descriptions and GSAP data attributes saved to ${outPath}`,
);
