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
    + <div class="ca__sequence">
    + <div class="ca__random">
    ```

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
