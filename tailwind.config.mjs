/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				layer: {
					0: 'hsl(var(--gray-0) / <alpha-value>)',
					1: 'hsl(var(--gray-1) / <alpha-value>)',
					2: 'hsl(var(--gray-2) / <alpha-value>)',
					3: 'hsl(var(--gray-3) / <alpha-value>)',
					4: 'hsl(var(--gray-4) / <alpha-value>)',
					5: 'hsl(var(--gray-5) / <alpha-value>)',
					6: 'hsl(var(--gray-6) / <alpha-value>)',
					7: 'hsl(var(--gray-7) / <alpha-value>)',
					8: 'hsl(var(--gray-8) / <alpha-value>)',
					9: 'hsl(var(--gray-9) / <alpha-value>)',
					10: 'hsl(var(--gray-10) / <alpha-value>)',
					11: 'hsl(var(--gray-11) / <alpha-value>)',
					12: 'hsl(var(--gray-12) / <alpha-value>)',
					13: 'hsl(var(--gray-13) / <alpha-value>)'
				},
			}
			// ...
		},
	},
	plugins: [
		function ({ addVariant, matchUtilities, theme, addUtilities }) {
			// matchUtilities(
			//   {
			// 	"bg-graph-paper": (value) => ({
			// 	  backgroundImage: `url("${svgToDataUri(
			// 		`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill-rule="evenodd"><g fill="${value}"><path opacity=".5" d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z"/><path d="M6 5V0H5v5H0v1h5v94h1V6h94V5H6z"/></g></g></svg>`
			// 	  )}")`,
			// 	}),
			//   },
			//   {
			// 	values: flattenColorPalette(theme("backgroundColor")),
			// 	type: "color",
			//   }
			// );
			addUtilities({
				'.tab-highlight-none': {
					'-webkit-tap-highlight-color': 'transparent'
				}
			});
			addVariant(
			  "supports-backdrop-blur",
			  "@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))"
			);
			addVariant(
			  "supports-scrollbars",
			  "@supports selector(::-webkit-scrollbar)"
			);
			addVariant("scrollbar", "&::-webkit-scrollbar");
			addVariant("scrollbar-track", "&::-webkit-scrollbar-track");
			addVariant("scrollbar-thumb", "&::-webkit-scrollbar-thumb");
		  },
	],
}
