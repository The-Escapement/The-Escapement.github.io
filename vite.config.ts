import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import preact from "@preact/preset-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import compression from "vite-plugin-compression2";
import { dynamicChunkPlugin } from "vite-plugin-dynamic-chunk";
import { imageToWebpPlugin } from "vite-plugin-image-to-webp";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => ({
  plugins: [
    vanillaExtractPlugin(),
    preact(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    dynamicChunkPlugin({}),
    imageToWebpPlugin(),
    compression(),
  ],
  root: "src",
  build: {
    cssMinify: "lightningcss" as const,
    outDir: resolve(__dirname, "dist"),
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
    postcss: resolve(__dirname, "postcss.config.ts"),
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      strict: false,
    },
  },
  publicDir: resolve(__dirname, "public"),
}));
