// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  site: "https://q1b.dev",
  // output: "server",

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
  integrations: [sitemap(), markdoc()],
});
