// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import markdoc from "@astrojs/markdoc";
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
	site: "https://sukhpreet.dev",
	output: "server",
	adapter: cloudflare({
		imageService: "passthrough",
	}),
	experimental: {
		contentIntellisense: true
	},
	vite: {
		plugins: [tailwindcss()]
	},
	integrations: [
		markdoc(),
		sitemap(),
	],
});
