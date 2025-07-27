// tools/generateAnimationsJson.js
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSS_FILE = path.join(__dirname, '../dist/cssanimation.css');
const OUTPUT_JSON = path.join(__dirname, '../dist/cssanimation.json');

let animationMetadata = {};
const metadataPath = path.join(__dirname, 'animation-metadata.json');
if (fs.existsSync(metadataPath)) {
  animationMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
}

function extractKeyframes(content) {
  const keyframes = {};
  const keyframesRegex = /@keyframes\s+([\w-]+)\s*{((?:[^{}]+|{(?:[^{}]+|{[^{}]*})*})*)}/g;

  let match;
  while ((match = keyframesRegex.exec(content)) !== null) {
    const [, name, block] = match;
    const frames = {};

    const frameRegex = /(from|to|\d{1,3}(?:\.\d+)?%)(?:\s*,\s*(from|to|\d{1,3}(?:\.\d+)?%))*\s*{([^}]+)}/g;
    let frameMatch;

    let currentBlockContent = block;

    while ((frameMatch = frameRegex.exec(currentBlockContent)) !== null) {
      const fullMatch = frameMatch[0];
      const styleBlock = frameMatch[frameMatch.length - 1];
      const positions = fullMatch
        .substring(0, fullMatch.indexOf('{'))
        .split(',')
        .map((p) => p.trim());

      const props = {};
      styleBlock.split(';').forEach((line) => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join(':').trim();
          if (key && value) {
            props[key] = value;
          }
        }
      });

      positions.forEach((pos) => {
        frames[pos] = props;
      });
    }

    if (name.toLowerCase().includes('in') && frames['from'] && !frames['to']) {
      const fromProps = frames['from'];
      const inferredToProps = {};

      if (fromProps.opacity === '0') {
        inferredToProps.opacity = '1';
      }

      if (fromProps.transform) {
        let finalTransform = fromProps.transform;
        finalTransform = finalTransform.replace(/translateX\(-?\d+(\.\d+)?%?\)/g, 'translateX(0)');
        finalTransform = finalTransform.replace(/translateY\(-?\d+(\.\d+)?%?\)/g, 'translateY(0)');
        finalTransform = finalTransform.replace(/scale\(\d+(\.\d+)?(?:,\s*\d+(\.\d+)?)*\)/g, 'scale(1)');
        finalTransform = finalTransform.replace(/rotate(X|Y|Z)?\(-?\d+(\.\d+)?deg\)/g, 'rotate$1(0deg)');
        finalTransform = finalTransform.replace(/translate3d\(([^,]+),([^,]+),([^)]+)\)/g, 'translate3d(0, 0, 0)');
        finalTransform = finalTransform.replace(/perspective\(\d+px\)/g, '');

        if (finalTransform.trim() === '') {
          inferredToProps.transform = 'none';
        } else {
          inferredToProps.transform = finalTransform.trim();
        }
      } else if (Object.keys(fromProps).some((prop) => prop.includes('transform'))) {
        inferredToProps.transform = 'none';
      }

      if (fromProps.filter) {
        inferredToProps.filter = 'none';
      }

      if (fromProps['clip-path']) {
        if (fromProps['clip-path'].includes('circle(0%')) {
          inferredToProps['clip-path'] = 'circle(100% at 50% 50%)';
        } else if (fromProps['clip-path'].includes('polygon(')) {
          inferredToProps['clip-path'] = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';
        } else if (fromProps['clip-path'].includes('inset(100%')) {
          inferredToProps['clip-path'] = 'inset(0)';
        }
      }

      if (Object.keys(inferredToProps).length > 0) {
        frames['to'] = {...(frames['to'] || {}), ...inferredToProps};
      }
    } else if (name.toLowerCase().includes('out') && frames['to'] && !frames['from']) {
      const toProps = frames['to'];
      const inferredFromProps = {};

      if (toProps.opacity === '0') {
        inferredFromProps.opacity = '1';
      }

      if (toProps.transform) {
        let initialTransform = toProps.transform;
        initialTransform = initialTransform.replace(/translateX\((.*?)\)/g, 'translateX(0)');
        initialTransform = initialTransform.replace(/translateY\((.*?)\)/g, 'translateY(0)');
        initialTransform = initialTransform.replace(/scale\((.*?)\)/g, 'scale(1)');
        initialTransform = initialTransform.replace(/rotate(X|Y|Z)?\((.*?)\)/g, 'rotate$1(0deg)');
        initialTransform = initialTransform.replace(/translate3d\(([^,]+),([^,]+),([^)]+)\)/g, 'translate3d(0,0,0)');

        if (initialTransform.trim() === '') {
          inferredFromProps.transform = 'none';
        } else {
          inferredFromProps.transform = initialTransform.trim();
        }
      } else if (Object.keys(toProps).some((prop) => prop.includes('transform'))) {
        inferredFromProps.transform = 'none';
      }

      if (toProps.filter) {
        inferredFromProps.filter = 'none';
      }

      if (Object.keys(inferredFromProps).length > 0) {
        frames['from'] = {...(frames['from'] || {}), ...inferredFromProps};
      }
    }

    keyframes[name] = frames;
  }

  return keyframes;
}

function extractClasses(content) {
  const classData = [];
  const classBlockRegex = /\.([\w\-]+)\s*{([^}]+)}/g;

  let match;
  while ((match = classBlockRegex.exec(content)) !== null) {
    const className = match[1];
    const styleBlockContent = match[2];

    const properties = {};
    let animationName = null;
    let duration = null;
    let timingFunction = null;
    let fillMode = null;
    let iterationCount = null;

    const lines = styleBlockContent.split(';');
    for (const line of lines) {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim();

        if (key && value) {
          properties[key] = value;

          if (key === 'animation-name') {
            animationName = value;
          } else if (key === 'animation-duration') {
            duration = value;
          } else if (key === 'animation-timing-function') {
            timingFunction = value;
          } else if (key === 'animation-fill-mode') {
            fillMode = value;
          } else if (key === 'animation-iteration-count') {
            iterationCount = value;
          } else if (key === 'animation') {
            // New strategy for parsing animation shorthand:
            // Define regex patterns for each possible component type
            const durationRegex = /(\d+\.?\d*(s|ms))/;
            const timingFunctionRegex = /(cubic-bezier\([^\)]+\)|steps\([^\)]+\)|linear|ease(?:-in|-out)?)/;
            const iterationCountRegex = /(infinite|normal|reverse|alternate|alternate-reverse)/;
            const fillModeRegex = /(forwards|backwards|both|none)/;
            const nameRegex = /^([a-zA-Z_][a-zA-Z0-9_-]*)$/; // Animation name is a simple identifier

            // Attempt to match each component directly from the value
            const partsToParse = value.split(/\s+/).filter(Boolean); // Split by space, filter empty

            for (const part of partsToParse) {
              if (durationRegex.test(part) && !duration) {
                duration = part;
              } else if (timingFunctionRegex.test(part) && !timingFunction) {
                timingFunction = part;
              } else if (iterationCountRegex.test(part) && !iterationCount) {
                iterationCount = part;
              } else if (fillModeRegex.test(part) && !fillMode) {
                fillMode = part;
              } else if (nameRegex.test(part) && !animationName) {
                // This is the animation name, if it hasn't been found yet
                animationName = part;
              }
            }
          }
        }
      }
    }

    if (animationName) {
      classData.push({
        className,
        animationName,
        duration: duration,
        timingFunction: timingFunction,
        fillMode: fillMode,
        iterationCount: iterationCount,
        allCssProps: properties,
      });
    }
  }
  return classData;
}

function generate() {
  if (!fs.existsSync(CSS_FILE)) {
    console.error(`❌ CSS file not found: ${CSS_FILE}`);
    return;
  }

  const content = fs.readFileSync(CSS_FILE, 'utf-8');
  const keyframesMap = extractKeyframes(content);
  const classList = extractClasses(content);

  const animationsOutput = {};

  classList.forEach((cls) => {
    const animationName = cls.animationName;
    const keyframes = keyframesMap[animationName];
    const meta = animationMetadata[cls.className] || {};

    const animationProps = {
      name: animationName,
      duration: cls.duration || meta.duration || '1s', // Default to 1s as per :root --cssanimation-duration
      timingFunction: cls.timingFunction || meta.timingFunction || 'ease-out',
      fillMode: cls.fillMode || meta.fillMode || 'both',
      iterationCount: cls.iterationCount || '1', // Default to '1' if not specified
      ...cls.allCssProps,
    };

    delete animationProps['animation'];
    delete animationProps['animation-name'];
    delete animationProps['animation-duration'];
    delete animationProps['animation-timing-function'];
    delete animationProps['animation-fill-mode'];
    delete animationProps['animation-iteration-count'];

    if (keyframes && Object.keys(keyframes).length > 0) {
      animationsOutput[animationName] = {
        class: cls.className,
        animation: animationProps,
        keyframes: keyframes,
        tags: meta.tags || [],
        category: meta.category || 'uncategorized',
      };
    } else {
      // Adjusted warning message to use cls.className for clarity
      console.warn(
        `⚠️ Keyframes for animation '${animationName}' (class '${cls.className}') not found or empty. Skipping.`,
      );
    }
  });

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(animationsOutput, null, 2));
  console.log(`✅ cssanimation.json generated at: ${OUTPUT_JSON}`);
}

generate();
