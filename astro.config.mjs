// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import keystatic from '@keystatic/astro'
import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	site: "https://q1b.dev",
	output: "server",
  adapter: cloudflare(),
  experimental: {
    contentIntellisense: true,
    clientPrerender: true,
  },
  devToolbar: {
    enabled: true,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "react-dom/server": "react-dom/server.edge",
      },
		},
	optimizeDeps: {
      exclude: ['@keystatic/astro'],
    },
    build: {
      rollupOptions: {
        // 2. Prevent Rollup from treating the virtual module as a missing physical file
        external: ['virtual:keystatic-config'],
      },
    },
	},
  integrations: [sitemap(), markdoc(),  react(), keystatic(), ],
});
