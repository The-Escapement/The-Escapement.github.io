import { style, globalStyle } from "@vanilla-extract/css";

export const gridClass = style({});

globalStyle(`${gridClass} figure`, {
  maxWidth: "calc(var(--measure) / 3 - var(--size-7))",
});

globalStyle(`${gridClass} img`, {
  borderRadius: "var(--radius-round)",
  border: "var(--size-1) solid var(--theme-light-color-accent)",
  transition:
    "transform 0.4s var(--ease-out-3), box-shadow 0.4s var(--ease-out-3)",
  objectFit: "cover",
  filter: "grayscale(80%)",
  width: "100%",
});

globalStyle(`${gridClass} img:hover`, {
  transform: "scale(1.1)",
  boxShadow: "0 0 var(--size-10) var(--theme-color-hover)",
  filter: "grayscale(50%)",
});

globalStyle(`${gridClass} figcaption`, {
  textAlign: "center",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  hyphens: "auto",
});
