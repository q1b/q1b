import theme from "tailwindcss/defaultTheme";

import type { Config } from "tailwindcss";

const config = {
	content: ["./src/**/*.{html,js,astro,ts}"],
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
				sans: ["Inter", ...theme.fontFamily.sans],
			},
		},
	},
} satisfies Config;

export default config;
