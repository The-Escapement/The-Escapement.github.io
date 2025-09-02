import { style, globalStyle } from "@vanilla-extract/css";

export const carousel = style({
  overflow: "hidden",
});

globalStyle(`${carousel} .mantine-Carousel-slide`, {
  background: "var(--theme-light-color-background-legible)",
  padding: "1em",
  marginInlineEnd: "1em",
  borderRadius: "var(--radius-3)",
  border: "var(--size-1) solid var(--theme-light-color-accent)",
});

globalStyle(`${carousel} .mantine-Carousel-slide:hover`, {
  filter: "sepia(10) saturate(2) hue-rotate(330deg)",
});

globalStyle(`${carousel} img`, {
  width: "100%",
});

globalStyle(`${carousel} cover-l`, {
  padding: "0em",
});

export const tantalum = style({});

export const platinum = style({});

export const gold = style({});

const exports = {
  carousel,
  tantalum,
  platinum,
  gold,
};
export default exports;
