# Contributing to cssanimation.io

Thank you for considering contributing to **cssanimation.io!** Your help makes this library better for designers and developers around the world.

This guide will walk you through the setup, standards, and process to ensure smooth collaboration.

## Getting Started

### 1. Fork & Clone

```bash
git clone https://github.com/your-username/cssanimation.io.git
cd cssanimation.io
npm install
```
### 2. Build the Project
```bash
npm run build
```

This runs the prefixer, copies assets, and extracts class references.

### 3. Start Contributing

Make your changes in the `src/` directory. Avoid editing `dist/` directly.

## Project Structure
```bash
src/
├── cssanimation.css              # Core animation styles
├── cssanimation-utility.css      # Utility modifiers (delay, speed, etc.)
├── cssanimation-gsap.js          # GSAP-enhanced animations
├── ca-letteranimation.js         # Letter-by-letter animation logic
└── cssanimation-reference.md     # Auto-generated class list
```
## Naming Conventions

CSS Class Prefixes

- Use `ca__` for all animation class names
- Example: `.ca__fadeIn`, `.ca__gsap-effect3d`

JavaScript Targets
- Always wrap selectors in `document.querySelector` or GSAP-safe strings
- Avoid hardcoding non-prefixed class names

## Scripts

| Command                   | Description                                                  |
|---------------------------|--------------------------------------------------------------|
| `npm run build`           | Full build: prefix CSS, copy assets, extract class names     |
| `npm run build:css`       | Compiles all CSS files using PostCSS with prefixing          |
| `npm run build:classlist` | Extracts and groups all `.ca__*` classes to markdown         |
| `npm run copy:assets`     | Copies JS, markdown, and module assets to the `dist/` folder |
| `npm run start`           | Watch mode for CSS changes with PostCSS                      |
| `npm run lint:css`        | Lint all CSS files with Stylelint                            |
| `npm run lint:css:fix`    | Fix stylelint issues automatically                           |
| `npm run format:css`      | Format CSS files using Prettier                              |


## Code Style

- Use 2 spaces for indentation
- Write clear, concise comments
- Use semantic naming (e.g. .ca__bounceInLeft > .bL)
- Prefer SCSS-like readability in raw CSS

## Submitting a Pull Request

Create a branch
```bash
git checkout -b feature/your-change
```
Commit clearly
```bash
git commit -m "Add: new animation ca__flashFadeIn"
```
Push to your fork
```bash
git push origin feature/your-change
```
Open a Pull Request to the main branch

## Reporting Bugs / Requesting Features

Open a GitHub Issue with:

- Clear title
- Steps to reproduce (if a bug)
- Expected vs actual behavior
- Screenshots or links if helpful

## Maintainer

- Email: hello@cssanimation.io
- [LinkedIn](https://www.linkedin.com/in/shafayetul/)
- [cssanimation.io](cssanimation.io)

Thank you again for your contributions 💛