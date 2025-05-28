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

**`ca__lt-delay` attribute support**
Developers can now control the delay between animated letters directly from HTML markup:

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

- **GSAP is now a required peer dependency**. Developers must install GSAP themselves:
  `bash
npm install cssanimationio gsap
`
  <br>

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

**Released:** May 2025
**Tag:** `v2.0.4`
**Focus:** Clean publish, modular structure, and future-friendly folder refactor

### What’s New

- **Dist-Only Publishing to NPM**
  Package is now cleaner and production-focused. Only the `dist/` folder is published, reducing size and removing dev clutter.

- **New Folder Structure**
  Modular CSS animations (e.g., `fade.css`, `rotate.css`, `zoom.css`) have been moved into a new `dist/modules/` directory for better organization.

<br>

# Version: v2.0.3

### Production-Ready Build – Only `dist/` Published

**Released:** May 2025
**Tag:** `v2.0.3`
**Focus:** Clean publish and future-friendly folder refactor

### Release Summary

This release refines the package for real-world usage and distribution by publishing only the compiled assets in the dist/ folder. It ensures consumers get exactly what they need—no build tools, no source clutter, just pure animations.

### What’s New in v2.0.3:

- **`dist/`-only NPM package**
  Reduced package size by excluding source files, configs, and dev tools — only production-ready assets are now shipped.
- **Cleaned Up File Structure**
  Improved maintainability by restructuring with a modular CSS build system and separating utility/animation modules.

### Optimized NPM Publish

Updated the package.json files field to explicitly include:

- dist/
- README.md
- LICENSE

```

```
