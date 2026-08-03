import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Use /resume/ for GitHub Pages and / for Cloudflare Pages.
export default defineConfig({
  base: process.env.SITE_BASE_PATH || '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
