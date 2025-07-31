import js from "@eslint/js";
import html from "@html-eslint/eslint-plugin";
import xo from "xo";

export default [
  js.configs.recommended,
  ...xo.xoToEslintConfig([
    {
      space: true,
      prettier: "compat",
    },
  ]),
  {
    files: ["**/*.html"],
    ...html.configs["flat/recommended"],
    rules: {
      ...html.configs["flat/recommended"].rules,
      // Disable strict formatting rules (autoformatting)
      "@html-eslint/indent": "off",
      "@html-eslint/no-extra-spacing-attrs": "off",
      "@html-eslint/require-closing-tags": "off",
      "@html-eslint/attrs-newline": "off",
      "@html-eslint/use-baseline": "off",
      "@html-eslint/element-newline": "off",
      "@html-eslint/no-multiple-empty-lines": "off",
      "@html-eslint/no-trailing-spaces": "off",
      "@html-eslint/quotes": "off",
      "@html-eslint/sort-attrs": "off",
      // All accessibility rules
      "@html-eslint/no-abstract-roles": "error",
      "@html-eslint/no-accesskey-attrs": "error",
      "@html-eslint/no-aria-hidden-body": "error",
      "@html-eslint/no-aria-hidden-on-focusable": "error",
      "@html-eslint/no-empty-headings": "error",
      "@html-eslint/no-heading-inside-button": "error",
      "@html-eslint/no-invalid-role": "error",
      "@html-eslint/no-non-scalable-viewport": "error",
      "@html-eslint/no-positive-tabindex": "error",
      "@html-eslint/no-skip-heading-levels": "error",
      "@html-eslint/require-form-method": "error",
      "@html-eslint/require-frame-title": "error",
      "@html-eslint/require-img-alt": "error",
      "@html-eslint/require-input-label": "error",
      "@html-eslint/require-meta-viewport": "error",
      // Additional best practice rules for accessibility
      "@html-eslint/no-nested-interactive": "error",
      "@html-eslint/require-button-type": "error",
      // SEO rules
      "@html-eslint/no-multiple-h1": "error",
      "@html-eslint/require-lang": "error",
      "@html-eslint/require-meta-description": "error",
      "@html-eslint/require-open-graph-protocol": "error",
      "@html-eslint/require-title": "error",
    },
  },
];
