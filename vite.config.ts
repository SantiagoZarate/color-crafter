import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("src/"),
      "@icon": path.resolve("src/components/icons/index.tsx"),
      "@util": path.resolve("src/utils"),
      "@component": path.resolve("src/components"),
      "@hook": path.resolve("src/hooks"),
    },
  },
});
