import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import { cloudflare } from "@cloudflare/vite-plugin" // new

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [cloudflare(),inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
