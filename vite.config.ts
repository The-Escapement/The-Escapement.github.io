import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import preact from "@preact/preset-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => ({
  plugins: [
    vanillaExtractPlugin(),
    preact(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  root: "src",
  build: {
    cssMinify: "lightningcss" as const,
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src", "index.html"),
      },
    },
  },
  resolve: {
    alias: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "~config": resolve(__dirname, "src", "config.ts"),
    },
  },
  css: {
    postcss: "./postcss.config.ts",
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      strict: false,
    },
  },
  publicDir: "../public",
}));
