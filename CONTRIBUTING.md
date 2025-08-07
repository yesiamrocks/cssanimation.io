# Contributing to {css}animation

# 🛠️ Contributing to {css}animation

Thank you for your interest in contributing to **{css}animation**.  
Your support helps bring better motion design to developers and designers around the world 💛

This guide will walk you through the setup, conventions, and submission process to make collaboration smooth and enjoyable.

## Getting Started

### 1. Fork & Clone the Repository

```bash
git clone https://github.com/your-username/cssanimation.git
cd cssanimation
```

### 2. Install dev dependencies

```bash
npm install
```

### 3. Create a new branch for your contribution:

```bash
git checkout -b feat/my-awesome-animation
```

Branch Naming Guidelines

| Purpose                                               | Prefix     | Example                          |
| ----------------------------------------------------- | ---------- | -------------------------------- |
| For new animations, major enhancements.               | `feature/` | `feature/fade-slide-left`        |
| For fixes                                             | `bugfix/`  | `fix/line-height-glitch`         |
| For documentation                                     | `docs/`    | `docs/update-readme`             |
| For build process updates, dependency bumps, linting. | `chore/`   | `hotfix/broken-transform-safari` |

### 3. Build the Project

This runs the prefixer, copies assets, and extracts class references.

## Project Structure

```bash
src/
├── cssanimation.css              # Core animation styles
├── cssanimation-utility.css      # Utility modifiers (delay, speed, etc.)
```

> Make your changes in the `src/` directory. Avoid editing `dist/` directly.

## Naming Conventions

CSS Class Prefixes

- Use `ca__fx-` for all animation class names
- Example: `.ca__fx-fadeIn`

JavaScript Targets

- Always wrap selectors in `document.querySelector`
- Avoid hardcoding non-prefixed class names

## Scripts

| Command                   | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
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
- Use semantic naming (e.g. `.ca__bounceInLeft`)
- Prefer SCSS-like readability in raw CSS

## Submitting a Pull Request

Create a branch

```bash
git checkout -b feature/your-change
```

Commit clearly

```bash
git commit -m "Add: new animation ca__fx-flashFadeIn"
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

- Email: yesiamrocks@gmail.com
- [LinkedIn](https://www.linkedin.com/in/shafayetul/)

Thank you again for your contributions 💛
