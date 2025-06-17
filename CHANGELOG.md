## [5.7.3] - 2025-06-17

### Badge Enhancements

- Updated all badges to use consistent `style=for-the-badge` format for improved visual style
- Fixed broken jsDelivr badge display (replaced API link with working shields.io badge)
- Added fallback to unpkg CDN link for reliable access to assets
- Centered badge block using HTML for improved alignment in GitHub README
- Updated "Made with ❤️" and "Built with ❤️ by Pavel" with visible icons and bold style
- Improved LinkedIn badge with clear label and style match

### Cleanup

- Removed Contributor Covenant badge for visual simplification (Code of Conduct remains in project)
- Reorganized badge layout for better readability

## [5.7.1] - 2025-06-17

### Documentation

- Restructured and cleaned up the `docs/` folder
- Updated all usage guides and examples to reflect the new `cssanimation` naming
- Fixed outdated links and removed legacy `.io` references

## [5.7.0] - 2025-06-17

### Rebrand

- **cssanimation.io is now officially cssanimation**
- All visual, textual, and metadata references updated to reflect the rebrand
- Updated site footer, titles, descriptions, and social share content
- Documentation rewritten to drop `.io` suffix and promote cssanimation as a platform
- No changes to core classnames or APIs — functionality remains backward compatible

### Note

If you're referencing the project, please use **cssanimation** going forward (no `.io`).

## [5.6.0] - 2025-06-12

### Added

- **Text Animation Preview Generator:**
  - Live, interactive preview of text and letter animations.
  - Animation control panel: Pause/Play, Restart, and Speed (duration/delay multiplier) controls.
  - Search functionality for `ca__fx-*` animation classes.
  - Shareable URL generation to encode and load specific animation configurations.
  - Copyable HTML code snippet display for easy integration into projects.
  - Dark/Light mode theme toggle with user preference persistence.
  - Improved UI/UX using Tailwind CSS.
  - Footer with dynamic current year.
  - Placeholder text for Delay input for better guidance.

### Changed

- **Preview Generator Logic (`index.html`):**
  - Switched to a robust re-initialization strategy that correctly updates attributes and calls `window.CSSAnimationLetter.reinit(element)`.
  - Centralized state management for UI elements to enable URL encoding/decoding.
  - All UI elements are now styled exclusively with Tailwind CSS utility classes.
  - Animation keyframes and base `.cssanimation` rules are maintained in a minimal inline `<style>` block for demo robustness.

### Fixed

- Resolved issues where animations would not consistently re-trigger or change after updating animation classes or other settings in the preview.
- Corrected the visibility of the "Line Separator" option, ensuring it only appears when "Line-by-Line" animation type is selected.
- Ensured the "Generated HTML Code" textarea correctly displays the current animation's HTML.
- Fixed the functionality of the Dark/Light mode theme switch button.
- Addressed accessibility warning regarding form labels by using `<fieldset>` and `<legend>`.

## [v5.5.0] - 2025-06-11

### New Features

- **Live Preview Support**  
  Introduced the ability to dynamically reapply `caLetterAnimation(el)` on elements. This enables live animation previews when DOM or attribute values change, perfect for visual editors or dev playgrounds.

- **Runtime Reinitialization**  
  `caLetterAnimation` can now safely be re-invoked on the same element. All animation units (letters, words, lines) are recalculated and replayed based on current attributes.

- **Dynamic Attribute Parsing**  
  Automatically parses and updates:

  - `ca__lt-sequence`
  - `ca__lt-random`
  - `ca__lt-reverse`
  - `ca__lt-word`
  - `ca__lt-line`

- **`ca__lt-separator Support`**  
  When `ca__lt-line` is used, users can now add `ca__lt-separator="dot"` to animate lines split by `.` instead of `<br>` or `\n`.

- **Multi-Class + Delay Handling**  
  Accepts multiple space-separated animation classes (e.g., `ca__fx-FadeIn ca__fx-BounceIn`) and delay sequences (`100 200 300`) mapped across units.

- **Global Duration Control**  
  Full support for `ca__lt-base-duration` allows global timing override (in milliseconds), improving consistency across animations.

### Improvements

- Safer attribute parsing and fallback logic to prevent JS errors.
- Improved compatibility with design tools and runtime environments.
- Modularized internal logic for future extensibility.

### Developer Notes

This release powers use cases like:

- UI animation playgrounds
- Visual text preview builders
- Runtime-reactive design systems

It works seamlessly in both static and JS-driven environments, with no dependencies beyond the base CSS.

## [5.4.0] - 2025-06-11

### Added

- **New Elastic CSS Animations:** Introduced 10 new, unique, and highly responsive CSS-only elastic animations for enhanced UI interactivity.
  - `elasticBounce`: A classic bounce effect, ideal for elements appearing or landing.
  - `springyEffect`: A generalized spring-like scale and squash effect.
  - `wobbleAnimation`: Horizontal translational wobble with slight rotation.
  - `jiggleTransform`: A playful rotation and subtle scale jiggle.
  - `stretchCollapse`: Vertical stretch and subsequent subtle collapse effect.
  - `reboundMotion`: Upward movement followed by a firm rebound to origin.
  - `snapBackEase`: An expanding entrance with a subtle overshoot and snap back.
  - `flexiShrink`: A quick shrink animation with an elastic overshoot.
  - `bouncyScale`: A large scale-in effect with a pronounced bounce at the end.
  - `pulseElastic`: A continuously pulsing elastic effect, suitable for attention-grabbing elements.

## [5.3.0] – 2025-06-10

### Added

🎯 **Bounce Animation Suite** — 10 new motion effects inspired by natural movement, UI interaction, and playful energy:

- `ca__fx-spring` — quick springy bounce with snappy return
- `ca__fx-boing` — exaggerated cartoon-style bounce
- `ca__fx-hop` — fast and light hop
- `ca__fx-lift` — elegant upward float and return
- `ca__fx-popUp` — subtle UI-style pop (great for buttons, tooltips)
- `ca__fx-rebound` — bounce + recoil like a soft collision
- `ca__fx-jump` — straight vertical jump motion
- `ca__fx-launch` — powerful upward launch with overshoot
- `ca__fx-elasticRise` — squishy bounce using vertical scaling
- `ca__fx-levitate` — smooth infinite hovering/levitation

> All animations are pure CSS and support timing/intensity overrides via CSS variables for easy theming and control.

## 5.2.1

## Added

- ✨ **New Vibe Animations Group** (`ca__fx-*`) — subtle to intense shake/motion effects:
  - `ca__fx-jiggle` — playful wobble with tilt
  - `ca__fx-quiver` — light trembling
  - `ca__fx-tremor` — slow, heavy shaking
  - `ca__fx-rumble` — rapid seismic jitter with rotation
  - `ca__fx-wiggle` — smooth side-to-side rocking
  - `ca__fx-rattle` — short, rapid left/right vibration
  - `ca__fx-buzz` — tight, fast micro-movement (like a phone vibration)

> All effects use pure CSS with customizable `--duration` and `--intensity` variables for full control.

## 5.1.1

### Fixes

- **Build Script Compatibility:**
  - Resolved `ReferenceError: require is not defined` errors across all Node.js utility scripts (e.g., `postcss.config.js`, `tools/extract-class-names.js`, `tools/build-animation-index.js`, `tools/generate-animation-demo.js`, `tools/generate-animation-preview.js`, `tools/export-modules.js`).
  - This was achieved by either converting scripts to full ES Module syntax or explicitly marking them as CommonJS (`.cjs`) where required by specific tool loaders (like `stylelint.config.cjs`).
  - Standardized internal file path resolution to use `import.meta.url` and `path.resolve(__dirname, ...)` for consistent behavior in ES Module environments.
- **Stylelint Configuration & Execution:**
  - Fixed `ERR_REQUIRE_CYCLE_MODULE` error by ensuring `stylelint.config.js` was correctly named `stylelint.config.cjs` and reverted to CommonJS export syntax for `cosmiconfig` compatibility.
  - Resolved `Error: ENOENT: no such file or directory` by updating `package.json` scripts to correctly reference `stylelint.config.cjs`.
  - Addressed `Unknown rule no-empty-first-line` by removing the unrecognized rule from the configuration.
  - Disabled the `keyframe-block-no-duplicate-selectors` rule to prevent unnecessary linting errors in compiled animation keyframes.
  - Corrected `import-notation` errors in `dist/modules/ca__modules-index.css` by updating `tools/export-modules.js` to generate `@import url(...)` syntax.
- **CSS Generation & Linting Exclusions:**
  - Updated `tools/export-modules.js` to automatically inject `/* stylelint-disable */` and `/* stylelint-enable */` comments around foundational CSS blocks (`:root`, `.cssanimation`, `.cssanimation span`, `.infinite`, `@media (prefers-reduced-motion: reduce)`) in all generated module files (`src/modules/*.css`). This allows for targeted linting of animation-specific rules while ignoring universal styles.
  - Cleaned up `dist/cssanimation.css` to resolve a `CssSyntaxError: All rules have already been disabled` by removing conflicting Stylelint disable comments.

### Build System Improvements

- **Targeted Linting:** Stylelint now exclusively targets compiled, un-minified CSS files within the `dist` folder (`dist/**/*.css`), automatically ignoring `.min.css` files globally.
- **Refined Class Pattern:** The `selector-class-pattern` in Stylelint configuration is now strictly applied to prefixed `ca__` classes, matching the output of the PostCSS build process.
- **Streamlined Module Export:** The `tools/export-modules.js` script provides a more robust and automated process for separating animations into individual CSS files, including common base styles and meta-comments.

# Version 5.1.0 - 2025-06-09

## Features

- **Modernized JavaScript Build Pipeline:**
  - Introduced **Rollup.js** for efficient JavaScript bundling, resulting in smaller, optimized output files.
  - Integrated **Terser** via `@rollup/plugin-terser` for robust JavaScript minification.
  - Automatically injects dynamic, versioned header comments (parsed from `package.json`) into both un-minified (`.js`) and minified (`.min.js`) output files.
- **Infrastructure Modernization (ES Modules):**
  - Project-wide migration of all internal Node.js build and utility scripts to **ES Module (`import`/`export`) syntax**. This includes `postcss.config.js`, and all scripts within the `tools/` directory (`extract-class-names.js`, `build-animation-index.js`, `generate-animation-demo.js`, `generate-animation-preview.js`).

## Refactor

- **ES Module Conversion:** All affected Node.js scripts were refactored from CommonJS `require()` to ES Module `import` syntax.
- **Path Resolution:** Standardized file path resolution within scripts using `import.meta.url` and `path.resolve(__dirname, ...)`, replacing older CommonJS `__dirname` patterns for compatibility and robustness.
- **Header Comment Consistency:** Ensured both CSS and JavaScript build processes output header comments in the universally recognized `/*!` format for reliable preservation by minifiers.

## Fixes

- **Build Script Errors:** Resolved `ReferenceError: require is not defined` errors that occurred after setting `"type": "module"` in `package.json`.
- **Missing Headers:** Fixed issues preventing the dynamic header comment block from being correctly added and preserved in both minified CSS and JavaScript output files.

# Version: 5.0.0

## Major Text Animation Overhaul

## New Features

- Letter-by-Letter, Word-by-Word, and Line-by-Line Animations Introducing granular text animations:
  - **Letter-by-Letter Animation**: Animate each letter sequentially, randomly, or in reverse.
  - **Word-by-Word Animation**: Animate text one word at a time.
  - **Line-by-Line Animation**: Animate text line by line, with support for custom separators.
- **Flexible Animation Class Support**: No longer limited to `.ca__le*` classes. Now, any CSS animation class can be used with text animations, providing greater flexibility.
- **Enhanced Timing Control** with `ca__lt-delay` and `ca__lt-base-duration` Fine-tune animation timing:
  - `ca__lt-delay`: Specify delays (in milliseconds) for each unit (letter, word, or line).
  - `ca__lt-base-duration`: Set a base duration for animations, overriding default durations.

### Example Usage

```html
<h1 class="cssanimation" ca__lt-sequence="ca__fx-FadeIn">Animate Me</h1>

<p class="cssanimation" ca__lt-word="ca__fx-SlideUp" ca__lt-delay="100">Word by word animation with delay</p>

<h2 class="cssanimation" ca__lt-line="ca__fx-FlipIn" ca__lt-separator="dot">First sentence. Second sentence.</h2>
```

## Migration Instructions

Version 5.0.0 introduces a significant overhaul of how text-based animations (Letter-by-Letter, Word-by-Word, Line-by-Line) are configured. This version moves away from a reliance on the `.ca__le*`CSS class to a more flexible and powerful attribute-based approach.

- **Simplified HTML Markup**: Previously, letter animations required `.ca__le*` classes. Now, simply add the `ca__lt-*` attribute to your HTML elements:

Previous

```html
<h1 class="cssanimation ca__lt-FadeIn sequence">Animate Me</h1>
```

Now

```html
<h1 class="cssanimation" ca__lt-sequence="ca__fx-FadeIn">Animate Me</h1>
```

## Attribute-Based Control

New animation control attributes: Customize animations directly in HTML using attributes:

- `ca__lt-sequence`: Animate letters in order
- `ca__lt-random`: Animate letters randomly
- `ca__lt-reverse`: Animate letters in reverse
- `ca__lt-word`: Word-by-word animation
- `ca__lt-line`: Line-by-line animation
- `ca__lt-delay`: Delay between items in `ms`
- `ca__lt-base-duration`: Override default duration
- `ca__lt-separator`: Define custom separators for line animations (e.g., `"dot"` for periods).

## Additional Enhancements

- **Improved Documentation**: Comprehensive guides and examples are available in the [README](https://github.com/yesiamrocks/cssanimation.io#readme), detailing usage and customization options.
- **Demo Page Updates**: The [demo page now showcases](https://yesiamrocks.github.io/cssanimation.io/animation-demo.html) the new animation features with updated examples and interactive previews.

For detailed examples and further information, please refer to the [official documentation](https://github.com/yesiamrocks/cssanimation.io#readme).

[Let me know](https://github.com/yesiamrocks/cssanimation.io/discussions) if you need assistance with integrating these new features into your project!

# Version: 4.1.0

## Features

- **Support for `ca__lt-duration` Attribute**

  - Developers can now manually specify base animation duration using:
    ```html
    ca__lt-duration="2000"
    ```

- **Auto-Detect Animation Duration from CSS**

  - If `ca__lt-duration` is not provided, the script will:
    1. Read the `animation-duration` from the first animation class
    2. Fallback to `1000ms` if unavailable

- **Robust Delay Handling with `parseDelaySteps()`**

  - Malformed or non-numeric delay values in `ca__lt-delay` are ignored safely
  - Fallbacks to default values when necessary

- **Improved Sequential Timing Logic**

  - `processSequentialBy()` now:
    - Adds `currentUnitDelay + baseDuration` to create true chained animations
    - Supports precise per-unit timing (e.g. `300 500 800`)
    - Applies consistent cumulative offset behavior across words/lines

- **Better Code Readability & Maintenance**
  - Delay and duration logic abstracted into reusable utilities
  - Cleaner and more modular for future additions (e.g. easing, loop, scroll-trigger)

---

## Example Usage

```html
<h2 ca__lt-word="fadeIn bounce slide" ca__lt-delay="300 800 200" ca__lt-duration="1500">
  Each word animates with precise delay and duration
</h2>
```

# Version: 4.0.0

## Major Update: GSAP Integration Moved to New Repo

This release removes all GSAP-related code, build logic, and dependencies from the `cssanimation.io` package.

**What's Changed:**

- 🧹 Removed `rollup.config.js` and the `build:gsap` script
- 🗃️ Deleted all GSAP output files from `/dist` (e.g., `cssanimation-gsap.*`)
- 📦 Removed GSAP from `devDependencies` and `peerDependencies`
- 🎯 Updated `package.json` exports to reflect CSS-only assets
- 🔗 Added crosslink in `README.md` to [`gsapanimation`](https://github.com/yesiamrocks/gsapanimation) — a dedicated repo for GSAP triggers, letter animation, and ScrollTrigger support

## New Structure Moving Forward:

- **`cssanimation.io`**: Pure CSS animation classes.
- **[`gsapanimation`](https://github.com/yesiamrocks/gsapanimation)**: JavaScript-based enhancements powered by GSAP

This cleanup makes `cssanimation.io` lighter, faster, and more focused. Perfect for storytelling sites, Tailwind projects, and CSS-only workflows.

# Version: 3.1.2

### Documentation

- Enhanced GSAP Letter Animation Guide
- Added detailed usage instructions for the ca\_\_gx-lt attribute supporting sequence, reverse, and random values.
- Includes updated examples, automatic span-wrapping explanation, and simplified ca-gsap usage syntax.

### Changed

- index.js now loads full cssanimation.io stack (CSS + letter animations + GSAP) in one import
- Removed direct UMD imports from ESM entry to prevent bundler issues
- Improved DX: using `import 'cssanimationio'` now auto-initializes animations
- Enhanced debug tooling with optional `window.__CA_DEBUG` flag

# Version: 3.1.1

### Added

- `removeLetterAnimationHints()` utility in `gsap-letteranimation.js` to clean up GPU-related styles after animations complete.

### Changed

- Updated `animateFadeIn` and `animateFadeInLeft`:
  - Automatically remove `will-change`, `backface-visibility`, and `transform-style` inline styles after animations.
  - Preserves any user-provided `onComplete` callbacks.
  - Improves memory efficiency for long-running or high-volume animation use.

### Notes

- Applies to both block and letter-based animations (`ca__gx-lt`).
- No developer setup required — cleanup is built-in and automatic.

# Version: 3.1.0

### Added

- Automatic prefixing of GSAP animation map keys using `ca__gx-` in `gen-animation-map.mjs`

### Changed

- Internal map generation now uses consistent naming with cssanimation.io
- All animation names can now be referenced uniformly across utility, GSAP, and data-attribute APIs

# Version: 3.0.3

### Added

- **Modular export system for animations**  
  A new Node.js script automatically extracts animation blocks from `./dist/cssanimation.css` and creates:

  - Individual module files using PascalCase naming (e.g., `ca__LetterFadeIn.css`)
  - Metadata headers in each file with module info and usage examples

- **`ca__index.css` auto-generated** a central file that imports all animation modules.

### 📁 Example Output

```bash
./dist/modules/
├── ca__LetterFadeIn.css
├── ca__BounceUp.css
├── ca__ZoomSlideLeft.css
├── ca__index.css
```

# Version: 3.0.2

### Added

**`ca__lt-delay` attribute support** Developers can now control the delay between animated letters directly from HTML markup:

- Example: `<div class="ca__lt-sequence" ca__lt-delay="200">Hello</div>`
- No JS changes required

### Improved

- Code updated to check for this attribute while preserving default delay behavior
- Fully backward compatible

# Version: 3.0.1

### Enhancements

- **PascalCase Class Prefixing**:
  - All class names now auto-convert to PascalCase format.
  - Helps maintain consistency, improves readability, and avoids naming collisions.

### Prefixing Rules by File Type

| File                       | Prefix    | Example Before   | Example After       |
| -------------------------- | --------- | ---------------- | ------------------- |
| `cssanimation.css`         | `ca__fx-` | `.bounce-in`     | `.ca__fx-BounceIn`  |
| `cssanimation-utility.css` | `ca__u-`  | `.grid-helper`   | `.ca__u-GridHelper` |
| Classes starting with `le` | `ca__lt-` | `.le-shake-text` | `.ca__lt-ShakeText` |

### Safe-Guarded Classes

These global classes are **excluded from prefixing**:

- `.cssanimation`
- `.cssanimation span`
- `.infinite`

### Developer Notes

- Class name logic lives in `postcss/prefixer.js`
- Ensure to run `npm run prefix:css:all` before build to apply changes
- Follow consistent class naming in raw `.css` files to avoid malformed output

# Version: 3.0.0

### Added

- **GSAP Animation Engine**: Introduced a new modular engine (`cssanimation-gsap.js`) that enables GSAP-powered animations using HTML attributes.
  - Usage via `data-gsap="bounce"` and `data-gsap-options='{ "y": 30, "duration": 1.5 }'`
  - Supports all GSAP animation properties like `x`, `y`, `opacity`, `scale`, `ease`, `repeat`, etc.
  - Compatible with Vite, Webpack, and plain HTML via UMD build.
- **Generated Animation Map**: Auto-generated `generated-animation-map.js` maps `data-gsap` names to animation functions for scalable modularity.
- **Error Handling**: Robust JSON validation for `data-gsap-options` with helpful console messages to aid developers.
- **New NPM Build Targets**:
  - `dist/ca__gsap/cssanimation-gsap.umd.js` – UMD-compatible build for browser use
  - `src/animations/` – Modular animation definitions
- **Developer Tools**:
  - Auto-copying of `animations` and `ca__gsap` folders in build
  - Added `generate:map` script to manage animation mapping
  - Improved `package.json` scripts and dev dependencies

### Changed

- Restructured `src/animations/` to follow one-module-per-animation best practice.
- Added `gsap` as a `peerDependency` to avoid forced version locks.
- Updated README with GSAP usage examples for:
  - NPM + Vite/ESM setup
  - Plain HTML via `<script>` + CDN

### Breaking Changes

- **GSAP is now a required peer dependency**. Developers must install GSAP themselves: `bash npm install cssanimationio gsap ` <br>

# Version: 2.2.1

### Added

- Support for `.ca__le*` letter animation classes in the class extraction tool
- A new dedicated section in `cssanimation-reference.md` titled **"Letter Animations Class"**
- Automated placement of the letter class section **after** `cssanimation.css` for improved logical flow

### Changed

- Improved `extract-class-names.js` script structure and maintainability
- Enhanced code readability with **extensive inline comments** to help future contributors

### Output Example

```md
## cssanimation.css

- `.ca__ease-in`
- `.ca__delay-500`

## Letter Animations Class

- `.ca__leFadeIn`
- `.ca__leZoomOut`

## cssanimation-utility.css
```

<br>

# Version: 2.2.0

### Added

- **Scoped Class Naming**  
  Introduced `.ca__sequence` and `.ca__random` class names to replace `.sequence` and `.random`. This avoids conflicts with third-party styles or libraries and improves maintainability across large projects and frameworks.

- **HTML-Aware Text Animation**  
  Updated the animation engine to traverse DOM nodes recursively. Now it wraps only pure text characters in `<span>` tags for animation while leaving nested HTML elements (like `<span>` icons, `<strong>`, etc.) untouched.

### Compatibility

- Fully tested in latest versions of:

  - Chrome, Firefox, Safari, Edge, Opera
  - iOS & Android mobile browsers

- Compatible with:
  - **React** (via `useEffect` or DOM `ref`)
  - **jQuery**
  - **Vanilla JS / Web Components**

### Migration Notes

- Replace old class references:

  ```diff
  - <div class="sequence">
  - <div class="random">
  * <div class="ca__sequence">
  * <div class="ca__random">
  ```

# Version: v2.0.4

### Production Build & Modular Structure Refinement

**Released:** May 2025 **Tag:** `v2.0.4` **Focus:** Clean publish, modular structure, and future-friendly folder refactor

### What’s New

- **Dist-Only Publishing to NPM** Package is now cleaner and production-focused. Only the `dist/` folder is published, reducing size and removing dev clutter.

- **New Folder Structure** Modular CSS animations (e.g., `fade.css`, `rotate.css`, `zoom.css`) have been moved into a new `dist/modules/` directory for better organization.

<br>

# Version: v2.0.3

### Production-Ready Build – Only `dist/` Published

**Released:** May 2025 **Tag:** `v2.0.3` **Focus:** Clean publish and future-friendly folder refactor

### Release Summary

This release refines the package for real-world usage and distribution by publishing only the compiled assets in the dist/ folder. It ensures consumers get exactly what they need—no build tools, no source clutter, just pure animations.

### What’s New in v2.0.3:

- **`dist/`-only NPM package** Reduced package size by excluding source files, configs, and dev tools — only production-ready assets are now shipped.
- **Cleaned Up File Structure** Improved maintainability by restructuring with a modular CSS build system and separating utility/animation modules.

### Optimized NPM Publish

Updated the package.json files field to explicitly include:

- dist/
- README.md
- LICENSE

```

```
