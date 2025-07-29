import js from "@eslint/js";
import htmlPlugin from "eslint-plugin-html";
import securityPlugin from "eslint-plugin-security";
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
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        alert: "readonly",
        requestAnimationFrame: "readonly",
        HTMLFormElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLElement: "readonly",
        NodeListOf: "readonly",
        Element: "readonly",
        HTMLAnchorElement: "readonly",
      },
    },
    plugins: {
      security: securityPlugin,
    },
    rules: {
      // Disable formatting rules that Prettier handles
      "@stylistic/indent": "off",
      "@stylistic/quotes": "off",
      "@stylistic/semi": "off",
      "@stylistic/comma-dangle": "off",
      "@stylistic/object-curly-spacing": "off",
      "@stylistic/array-bracket-spacing": "off",
      "@stylistic/arrow-parens": "off",
      "@stylistic/function-paren-newline": "off",
      "@stylistic/operator-linebreak": "off",
      "@stylistic/no-mixed-operators": "off",
      "@stylistic/no-mixed-spaces-and-tabs": "off",
      "@stylistic/padding-line-between-statements": "off",
      "@stylistic/spaced-comment": "off",
      "@stylistic/no-trailing-spaces": "off",
      "@stylistic/eol-last": "off",
      "@stylistic/max-len": "off",
      "@stylistic/prefer-arrow-callback": "off",
      "@stylistic/curly": "off",

      // Keep code quality and security rules
      "no-console": "off",
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-regexp": "warn",
      "security/detect-unsafe-regex": "warn",
      "security/detect-buffer-noassert": "warn",
      "security/detect-child-process": "warn",
      "security/detect-disable-mustache-escape": "warn",
      "security/detect-eval-with-expression": "warn",
      "security/detect-no-csrf-before-method-override": "warn",
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-non-literal-require": "warn",
      "security/detect-possible-timing-attacks": "warn",
      "security/detect-pseudoRandomBytes": "warn",
    },
  },
  {
    files: ["**/*.html"],
    plugins: {
      html: htmlPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
