import js from "@eslint/js";
import htmlPlugin from "eslint-plugin-html";
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
    rules: {
      // Keep code quality rules
      "no-console": "off",
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
