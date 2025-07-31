console.log('Script running: convert-to-gsap.js [Start]');

import {readFile, writeFile, mkdir} from 'fs/promises';
import {join} from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mapping of CSS easing functions to GSAP easing functions
const easingMap = {
  ease: 'power1.out',
  'ease-in': 'power1.in',
  'ease-out': 'power1.out',
  'ease-in-out': 'power1.inOut',
  'cubic-bezier(0.25, 1.25, 0.5, 1.2)': 'power2.out',
  'cubic-bezier(0.3, 1.5, 0.5, 1)': 'power2.out',
  'cubic-bezier(0.45, 0, 0.55, 1.5)': 'power2.out',
  'cubic-bezier(0.3, 1.4, 0.5, 1)': 'power2.out',
  'cubic-bezier(0.15, 0.85, 0.3, 1.2)': 'power2.out',
  'cubic-bezier(0.34, 1.56, 0.64, 1)': 'power2.out',
  'cubic-bezier(0.68, -0.55, 0.265, 1.55)': 'power2.out',
  'cubic-bezier(0.2, 0.8, 0.3, 1.2)': 'power2.out',
  'cubic-bezier(0.25, 1.8, 0.4, 1)': 'power2.out',
  linear: 'none',
  'steps(4, end)': 'steps(4)',
  'steps(5, end)': 'steps(5)',
  'steps(6, end)': 'steps(6)',
  'steps(7, end)': 'steps(7)',
  'steps(8, end)': 'steps(8)',
  'steps(10, end)': 'steps(10)',
};

// Function to convert CSS transform properties to GSAP format
function convertTransformToGSAP(transform) {
  const result = {};
  if (!transform) return result;

  const translateMatch = transform.match(/translate[XYZ]?\((-?[\d.]+%?|-?[\d.]+px?)\)/g);
  if (translateMatch) {
    translateMatch.forEach((t) => {
      if (t.includes('translateX')) {
        result.x = t.match(/translateX\((-?[\d.]+%?|-?[\d.]+px?)\)/)[1];
      } else if (t.includes('translateY')) {
        result.y = t.match(/translateY\((-?[\d.]+%?|-?[\d.]+px?)\)/)[1];
      } else if (t.includes('translateZ')) {
        result.z = t.match(/translateZ\((-?[\d.]+%?|-?[\d.]+px?)\)/)[1];
      } else if (t.includes('translate(')) {
        const [x, y] = t.match(/translate\((-?[\d.]+%?|-?[\d.]+px?),\s*(-?[\d.]+%?|-?[\d.]+px?)\)/).slice(1);
        result.x = x;
        result.y = y;
      }
    });
  }

  const scaleMatch = transform.match(/scale[XYZ]?\([\d.]+\)|scale\([\d.]+,\s*[\d.]+\)/g);
  if (scaleMatch) {
    scaleMatch.forEach((s) => {
      if (s.includes('scaleX')) {
        result.scaleX = s.match(/scaleX\(([\d.]+)\)/)[1];
      } else if (s.includes('scaleY')) {
        result.scaleY = s.match(/scaleY\(([\d.]+)\)/)[1];
      } else if (s.includes('scaleZ')) {
        result.scaleZ = s.match(/scaleZ\(([\d.]+)\)/)[1];
      } else if (s.includes('scale(')) {
        const [x, y] = s.match(/scale\(([\d.]+),\s*([\d.]+)\)/).slice(1);
        result.scaleX = x;
        result.scaleY = y;
      } else if (s.includes('scale(')) {
        const scale = s.match(/scale\(([\d.]+)\)/)[1];
        result.scale = scale;
      }
    });
  }

  const rotateMatch = transform.match(/rotate[XYZ]?\(-?[\d.]+deg\)/g);
  if (rotateMatch) {
    rotateMatch.forEach((r) => {
      if (r.includes('rotateX')) {
        result.rotationX = r.match(/rotateX\((-?[\d.]+)deg\)/)[1];
      } else if (r.includes('rotateY')) {
        result.rotationY = r.match(/rotateY\((-?[\d.]+)deg\)/)[1];
      } else if (r.includes('rotateZ')) {
        result.rotationZ = r.match(/rotateZ\((-?[\d.]+)deg\)/)[1];
      } else if (r.includes('rotate(')) {
        result.rotation = r.match(/rotate\((-?[\d.]+)deg\)/)[1];
      }
    });
  }

  const skewMatch = transform.match(/skew[XY]\(-?[\d.]+deg\)/g);
  if (skewMatch) {
    skewMatch.forEach((s) => {
      if (s.includes('skewX')) {
        result.skewX = s.match(/skewX\((-?[\d.]+)deg\)/)[1];
      } else if (s.includes('skewY')) {
        result.skewY = s.match(/skewY\((-?[\d.]+)deg\)/)[1];
      }
    });
  }

  return result;
}

// Function to convert CSS properties to GSAP properties
function convertCSStoGSAP(cssProps) {
  const gsapProps = {};
  if (cssProps.opacity) gsapProps.opacity = cssProps.opacity;
  if (cssProps.filter) {
    const blurMatch = cssProps.filter.match(/blur\((\d+)px\)/);
    if (blurMatch) gsapProps.filter = `blur(${blurMatch[1]}px)`;
    const brightnessMatch = cssProps.filter.match(/brightness\(([\d.]+)\)/);
    if (brightnessMatch)
      gsapProps.filter = gsapProps.filter
        ? `${gsapProps.filter} brightness(${brightnessMatch[1]})`
        : `brightness(${brightnessMatch[1]})`;
  }
  if (cssProps.transform) {
    Object.assign(gsapProps, convertTransformToGSAP(cssProps.transform));
  }
  if (cssProps['clip-path']) {
    gsapProps.clipPath = cssProps['clip-path'];
  }
  if (cssProps['-webkit-mask-position']) {
    gsapProps.webkitMaskPosition = cssProps['-webkit-mask-position'];
  }
  if (cssProps['mask-position']) {
    gsapProps.maskPosition = cssProps['mask-position'];
  }
  return gsapProps;
}

// Function to parse CSS keyframes
function parseKeyframes(keyframeContent) {
  const frames = [];
  const frameRegex = /(\d+%|from|to)\s*\{([^}]*)\}/g;
  let match;
  while ((match = frameRegex.exec(keyframeContent)) !== null) {
    const percentage = match[1] === 'from' ? '0%' : match[1] === 'to' ? '100%' : match[1];
    const props = {};
    const propRegex = /([\w-]+)\s*:\s*([^;]+)/g;
    let propMatch;
    while ((propMatch = propRegex.exec(match[2])) !== null) {
      props[propMatch[1].trim()] = propMatch[2].trim();
    }
    frames.push({percentage: parseFloat(percentage) / 100, props});
  }
  return frames.sort((a, b) => a.percentage - b.percentage);
}

// Function to convert CSS animation to GSAP
function convertAnimationToGSAP(animationName, keyframeContent, animationProps) {
  const frames = parseKeyframes(keyframeContent);
  const durationMatch = animationProps['animation-duration']?.match(/([\d.]+)s/);
  const duration = durationMatch ? parseFloat(durationMatch[1]) : 1;
  const timingFunction = animationProps['animation-timing-function'] || 'ease';
  const iterationCount = animationProps['animation-iteration-count'] || '1';
  const ease = easingMap[timingFunction] || 'power1.out';

  if (frames.length <= 2) {
    // Simple from-to animation
    const fromProps = convertCSStoGSAP(frames[0]?.props || {});
    const toProps = convertCSStoGSAP(frames[1]?.props || frames[0]?.props || {});
    const gsapCode = `gsap.fromTo(".ca__fx-${animationName}", 
  ${JSON.stringify(fromProps, null, 2).replace(/"([^"]+)":/g, '$1:')},
  {
    ${Object.entries(toProps)
      .map(([k, v]) => `${k}: "${v}"`)
      .join(',\n    ')},
    duration: ${duration},
    ease: "${ease}"
  }
);`;
    return {code: gsapCode, isTimeline: false};
  } else {
    // Timeline for multi-keyframe animations
    const timelineName = `tl_${animationName}`;
    let gsapCode = `const ${timelineName} = gsap.timeline({ defaults: { ease: "${ease}" } });\n`;
    let currentTime = 0;
    for (let i = 1; i < frames.length; i++) {
      const prevFrame = frames[i - 1];
      const currentFrame = frames[i];
      const timeIncrement = (currentFrame.percentage - prevFrame.percentage) * duration;
      const toProps = convertCSStoGSAP(currentFrame.props);
      gsapCode += `${timelineName}.to(".ca__fx-${animationName}", {
    ${Object.entries(toProps)
      .map(([k, v]) => `${k}: "${v}"`)
      .join(',\n    ')},
    duration: ${timeIncrement.toFixed(2)},
    ease: "${ease}"
  }, ${currentTime.toFixed(2)});\n`;
      currentTime += timeIncrement;
    }
    if (iterationCount === 'infinite') {
      gsapCode += `${timelineName}.repeat(-1);\n`;
    }
    return {code: gsapCode, isTimeline: true};
  }
}

// Main conversion function
async function convertCSStoGSAP(cssContent) {
  console.log('convertCSStoGSAP called');
  const animations = [];
  const keyframesRegex = /@keyframes\s+([^{]+)\s*{([^}]+)}/g;
  const animationClassRegex = /\.ca__fx-([^{]+)\s*{([^}]+)}/g;
  const keyframes = {};
  const animationProps = {};

  // Parse keyframes
  let match;
  while ((match = keyframesRegex.exec(cssContent)) !== null) {
    const name = match[1].trim();
    keyframes[name] = match[2];
  }

  // Parse animation classes
  while ((match = animationClassRegex.exec(cssContent)) !== null) {
    const className = match[1].trim();
    const props = {};
    const propRegex = /([\w-]+)\s*:\s*([^;]+)/g;
    let propMatch;
    while ((propMatch = propRegex.exec(match[2])) !== null) {
      props[propMatch[1].trim()] = propMatch[2].trim();
    }
    if (props['animation-name']) {
      animationProps[className] = props;
    }
  }

  // Convert each animation
  for (const [className, props] of Object.entries(animationProps)) {
    const animationName = props['animation-name'];
    if (keyframes[animationName]) {
      animations.push(convertAnimationToGSAP(className, keyframes[animationName], props));
    }
  }

  // Sort animations (non-timelines first, then timelines)
  animations.sort((a, b) => a.isTimeline - b.isTimeline);

  // Generate final GSAP code
  let output = '/* GSAP Animations generated from cssanimation.css */\n';
  output += 'import { gsap } from "gsap";\n\n';
  animations.forEach((anim) => {
    output += anim.code + '\n';
  });

  return output;
}

// Read CSS file and generate GSAP file
async function main() {
  const cssFilePath = join(__dirname, '..', 'dist', 'cssanimation.css');
  const outputFilePath = join(__dirname, '..', 'src', 'cssanimation-gsap.js');

  try {
    console.log(`Reading CSS file: ${cssFilePath}`);
    const cssContent = await readFile(cssFilePath, 'utf8');
    console.log('Converting CSS to GSAP...');
    const gsapCode = await convertCSStoGSAP(cssContent);
    console.log(`Writing GSAP file: ${outputFilePath}`);
    await mkdir(join(__dirname, '..', 'src'), {recursive: true});
    await writeFile(outputFilePath, gsapCode, 'utf8');
    console.log('GSAP animations generated successfully at:', outputFilePath);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
console.log('Script running: convert-to-gsap.js [End]');
