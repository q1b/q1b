// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
	site: 'https://sukhpreet.dev',
	output: "hybrid",
	adapter: cloudflare({
		imageService: "passthrough",
	}),
	experimental: {
		contentIntellisense: true,
		contentLayer: true,
	},
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		markdoc(),
		sitemap(),
	],
});
