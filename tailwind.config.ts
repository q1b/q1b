import { fontFamily } from "tailwindcss/defaultTheme";
import F from "@tailwindcss/forms";
import T from "@tailwindcss/typography";
import { themePreset } from "./tailwind.theme";
import type { Config } from "tailwindcss";

const config = {
	presets: [themePreset],
	content: ["./src/**/*.{html,js,astro,ts}"],
	safelist: ["dark"],
	darkMode: "selector",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				cursive: ["Borel", "cursive"],
				sans: ["Inter", ...fontFamily.sans],
			},
		},
	},
	plugins: [F, T],
} satisfies Config;

export default config;
