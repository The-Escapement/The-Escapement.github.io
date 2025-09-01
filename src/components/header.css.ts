// DESIGN: Vanilla Extract DSL has its own naming conventions
/* eslint-disable @typescript-eslint/naming-convention */
import { style, globalStyle, keyframes } from "@vanilla-extract/css";

const headerDropDown = keyframes({
  "0%": {
    transform: "translateY(-100%)",
    opacity: 0,
  },
  "100%": {
    transform: "translateY(0)",
    opacity: 1,
  },
});

const headerBreakpoint = "730px";

const header = style({
  position: "fixed",
  zIndex: "var(--layer-1)",
  background: "var(--theme-dark-color-background-bold)",
  borderBottom: "var(--size-px) solid var(--theme-color-detail)",
  // DESIGN: Start hidden and drop down with React startup
  transform: "translateY(-100%)",
  opacity: 0,
  animation: `${headerDropDown} 1s ease-out 1s forwards`,
});

const navLinks = style({});

globalStyle(`${header} nav`, {
  width: "100vw",
});

globalStyle(`${header} img`, {
  height: "1.5em",
  filter: "invert(1)",
});

globalStyle(`${header} img:hover`, {
  filter:
    "invert(0.5) sepia(1) brightness(1.3) drop-shadow(0 0 var(--size-3) var(--gold-7))",
});

globalStyle(`${header} ${navLinks} a`, {
  color: "var(--theme-dark-color-text-legible)",
  textDecoration: "none",
  fontSize: "var(--s0)",
  transition: "color var(--ease-out-3)",
});

globalStyle(`${header} ${navLinks} a:hover`, {
  color: "var(--theme-color-hover)",
});

globalStyle(`${header} .mantine-Burger-root`, {
  vars: {
    "--burger-color": "var(--theme-dark-color-text-emphasized)",
  },
  visibility: "hidden",
  "@media": {
    [`(max-width: ${headerBreakpoint})`]: {
      visibility: "visible",
    },
  },
});

globalStyle(`${header} .mantine-Burger-root:hover`, {
  vars: {
    "--burger-color": "var(--theme-color-hover)",
  },
});

globalStyle(`${header} ${navLinks}`, {
  "@media": {
    [`(max-width: ${headerBreakpoint})`]: {
      position: "absolute",
      top: "100%",
      right: 0,
      width: "auto",
      background: "var(--theme-dark-color-background-bold)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: "var(--size-4)",
      borderBottom: "var(--size-px) solid var(--stone-6)",
      borderLeft: "var(--size-px) solid var(--stone-6)",
      transformOrigin: "top",
      transition: "all 0.3s var(--ease-out-3)",
      opacity: 0,
      transform: "scaleY(0)",
      visibility: "hidden",
    },
  },
});

globalStyle(`${header} ${navLinks}.menu-opened`, {
  "@media": {
    [`(max-width: ${headerBreakpoint})`]: {
      opacity: 1,
      transform: "scaleY(1)",
      visibility: "visible",
    },
  },
});

globalStyle(`${header} ${navLinks}:not(.menu-opened)`, {
  "@media": {
    [`(max-width: ${headerBreakpoint})`]: {
      opacity: 0,
      transform: "scaleY(0)",
      visibility: "hidden",
    },
  },
});

globalStyle(`${header} ${navLinks} cluster-l`, {
  "@media": {
    [`(max-width: ${headerBreakpoint})`]: {
      flexDirection: "column",
      flexWrap: "nowrap",
    },
  },
});

// Body frozen state
globalStyle("body.frozen", {
  overflow: "hidden",
});

globalStyle("body.frozen main", {
  pointerEvents: "none",
});

const exports = { header, navLinks };
export default exports;
