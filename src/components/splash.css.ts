import { style, globalStyle } from "@vanilla-extract/css";

export const splashSection = style({
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
});

export const splashComing = style({
  fontSize: "var(--s2)",
  fontWeight: "var(--theme-splash-coming-font-weight)",
  maxWidth: "100vw",
});

globalStyle(`section.${splashSection}.theme-dark`, {
  backgroundImage: "var(--theme-dark-image-background-splash)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  filter: "brightness(1.1)",
});

globalStyle(`section.${splashSection}.theme-light`, {
  backgroundImage: "var(--theme-light-image-background-splash)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  filter: "brightness(1.1)",
});

globalStyle(`${splashSection} img`, {
  width: "min(95vw, 50em)",
  filter:
    "drop-shadow(var(--size-3) var(--size-3) var(--size-3) var(--gray-12))",
});

globalStyle(`${splashSection}.theme-dark ${splashComing}`, {
  color: "var(--theme-dark-color-text-emphasized)",
});

globalStyle(`${splashSection}.theme-light ${splashComing}`, {
  color: "var(--theme-light-color-text-emphasized)",
});

globalStyle(`${splashSection} .mantine-Button-root`, {
  vars: {
    "--button-radius": "var(--mantine-radius-md)",
  },
  textDecoration: "none",
  fontSize: "var(--s0)",
  fontWeight: "normal",
  color: "var(--theme-splash-contact-color-text)",
  maxWidth: "100vw",
  whiteSpace: "normal",
  textAlign: "center",
  height: "auto",
  display: "flex",
  alignItems: "center",
  padding: "var(--size-2)",
  justifyContent: "center",
});

globalStyle(`${splashSection} .mantine-Button-root:hover`, {
  backgroundColor: "var(--theme-splash-contact-color-hover)",
});

globalStyle(`.mantine-Button-label`, {
  whiteSpace: "normal",
  wordBreak: "break-word",
  lineHeight: "1.2",
});

const exports = { splashSection, splashComing };
export default exports;
