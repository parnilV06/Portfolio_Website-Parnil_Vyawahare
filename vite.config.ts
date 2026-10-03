import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "node:fs";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared", "./content", "index.html"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
      "@content": path.resolve(__dirname, "./content"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url === "/admin" || url === "/admin/") {
          const adminHtmlPath = path.resolve(__dirname, "./public/admin/index.html");
          if (fs.existsSync(adminHtmlPath)) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(fs.readFileSync(adminHtmlPath, "utf-8"));
            return;
          }
        }
        if (url === "/admin/config.yml" || url === "/config.yml") {
          const configPath = path.resolve(__dirname, "./public/admin/config.yml");
          if (fs.existsSync(configPath)) {
            res.setHeader("Content-Type", "text/yaml; charset=utf-8");
            res.end(fs.readFileSync(configPath, "utf-8"));
            return;
          }
        }
        next();
      });

      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
