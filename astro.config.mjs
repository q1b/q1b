import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://sukhpreet.dev',
  output: "server",
  adapter: cloudflare({
    runtime: {
      mode: "local"
    }
  }),
  integrations: [tailwind(),  react(), mdx()]
});