# cssanimation.io Scripts Reference

This page documents the key npm scripts used to build and maintain the cssanimation.io library.

These commands are defined in your package.json and help automate tasks like prefixing, copying files, and generating class documentation.

## Scripts Table

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


## How to Use

Run these from the root of the project:
```bash
npm run build           # for a full production-style build
npm run build:classlist # to regenerate class-reference.md
npm run copy:assets     # to manually copy JS and static assets
```

## Notes

- All class prefixing and extraction logic lives in `tools/` and `postcss/.`
- The `class-reference.md` output groups animation classes by file for easy documentation.
- You can customize the build by editing the npm scripts in `package.json`.