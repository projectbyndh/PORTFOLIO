import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  base: './', // Ensures correct asset loading for static hosting
  server: {
    host: "0.0.0.0",
  },
});