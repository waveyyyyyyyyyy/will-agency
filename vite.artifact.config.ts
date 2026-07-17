import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";

// Standalone single-file build used only to publish a quick preview
// (e.g. as a Claude Artifact). Not used for the real production deploy.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@fontsource-variable/inter": path.resolve(__dirname, "src/assets-artifact/inter.css"),
      "@fontsource-variable/bricolage-grotesque": path.resolve(
        __dirname,
        "src/assets-artifact/bricolage.css",
      ),
    },
  },
  build: {
    outDir: "dist-artifact",
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
});
