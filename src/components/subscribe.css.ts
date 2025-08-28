import { style, globalStyle } from "@vanilla-extract/css";

export const form = style({});

globalStyle(`${form} input, ${form} button`, {
  width: "100%",
});

const exports = { form };
export default exports;
