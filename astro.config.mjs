import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: 'https://sukhpreet.dev',
  adapter: cloudflare({
    runtime: {
      mode: "local"
    }
  }),
  integrations: [tailwind(), markdoc(), react()]
});