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
    files: ["**/*.html"],
    plugins: {
      html: htmlPlugin,
    },
  },
];
