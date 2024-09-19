import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { vercelPreset } from "@vercel/remix/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { installGlobals } from "@remix-run/node";

installGlobals();

export default defineConfig({
	plugins: [remix({
		presets: [vercelPreset(), tsconfigPaths()]
	})],
	server: {
		host: '127.0.0.1',
	},
});
