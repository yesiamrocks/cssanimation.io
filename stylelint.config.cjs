// stylelint.config.cjs

module.exports = {
  // Use 'ignoreFiles' to explicitly tell Stylelint to skip certain files.
  // This will prevent it from linting any files that end with '.min.css'
  // anywhere in your project, including within the 'dist' folder.
  ignoreFiles: ['**/*.min.css'],

  // Extends a standard set of Stylelint rules for general best practices.
  extends: 'stylelint-config-standard',

  rules: {
    // This rule enforces a specific naming pattern for class selectors.
    // It expects classes to start with 'ca__' followed by 'fx' or 'u',
    // then a hyphen, and then alphanumeric characters, underscores, or hyphens.
    // This is ideal for your prefixed classes in the 'dist' output.
    'selector-class-pattern': '^ca__(fx|u)-[a-zA-Z0-9_-]+$',

    // This rule is set to null, meaning no specific naming pattern will be
    // enforced for keyframes.
    'keyframes-name-pattern': null,

    // Disallows duplicate CSS selectors within the same stylesheet,
    // helping to catch redundant or overriding code.
    //'no-duplicate-selectors': true,

    //Disable the specific rule for duplicate keyframe block selectors
    'keyframe-block-no-duplicate-selectors': null,

    // Ensures there's an empty line before CSS rules for better readability.
    // It includes exceptions for comments and first rules in a nested block.
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
        except: ['after-single-line-comment'],
      },
    ],

    // Disallows empty CSS source files.
    'no-empty-source': true,

    // Disallows non-standard or invisible whitespace characters.
    'no-irregular-whitespace': true,
  },
};
