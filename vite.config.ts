import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/.netlify/functions/": "http://localhost:9999/",
    },
  },
  plugins: [react(), tailwindcss()],
});
