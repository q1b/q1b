import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://sukhpreet.dev',
  output: "hybrid",
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [tailwind(), mdx(), sitemap()]
});