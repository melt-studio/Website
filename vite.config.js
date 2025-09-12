import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  assetsInclude: ["**/*.obj"],
  server: {
    proxy: {
      "/.netlify/functions/": "http://localhost:9999/",
    },
  },
  plugins: [react(), tailwind()],
});
