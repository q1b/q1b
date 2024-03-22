import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: 'http://locahost:3000/',
  adapter: cloudflare({
    runtime: {
      mode: "local"
    }
  }),
  integrations: [tailwind(), markdoc()]
});