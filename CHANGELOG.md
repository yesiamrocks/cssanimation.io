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
  Modular CSS animations (e.g., `fade.css`, `rotate.css`, `zoom.css`) have been moved into a new `src/animations/` directory for better organization.
