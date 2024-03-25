import TypographyPlugin from '@tailwindcss/typography'
import svgToDataUri from 'mini-svg-data-uri';
import * as colors from "tailwindcss/colors"
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"

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
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						// maxWidth: 'none',
						color: theme('colors.slate.700'),
						'h2, h3, h4': {
							'scroll-margin-top': 'var(--scroll-mt)',
						},
						ul: {
							listStyleType: 'none',
							paddingLeft: '1em',
							marginTop: '1em',
							marginBottom: '2em',
						},
						'ul > li': {
							position: 'relative',
							// paddingLeft: '0',
							paddingLeft: '0.5em',
							listStyleType: 'disc',
							marginTop: '0.75em',
							marginBottom: '0.75em',
						},
						// 'ul > li::before': {
						//   content: '""',
						//   width: '0.75em',
						//   height: '0.125em',
						//   position: 'absolute',
						//   top: 'calc(0.875em - 0.0625em)',
						//   left: 0,
						//   borderRadius: '999px',
						//   backgroundColor: theme('colors.slate.300'),
						// },
						'--tw-prose-bullets': theme('colors.slate.300'),
						a: {
							fontWeight: theme('fontWeight.semibold'),
							textDecoration: 'none',
							borderBottom: `1px solid ${theme('colors.sky.300')}`,
						},
						'a:hover': {
							borderBottomWidth: '2px',
						},
						'a code': {
							color: 'inherit',
							fontWeight: 'inherit',
						},
						strong: {
							color: theme('colors.slate.900'),
							fontWeight: theme('fontWeight.semibold'),
						},
						'a strong': {
							color: 'inherit',
							fontWeight: 'inherit',
						},
						kbd: {
							background: theme('colors.slate.100'),
							borderWidth: '1px',
							borderColor: theme('colors.slate.200'),
							padding: '0.125em 0.25em',
							color: theme('colors.slate.700'),
							fontWeight: 500,
							fontSize: '0.875em',
							fontVariantLigatures: 'none',
							borderRadius: '4px',
							margin: '0 1px',
						},
						code: {
							fontWeight: 550,
							fontVariantLigatures: 'none',
							backgroundColor: theme('colors.white'),
						},
						'strong code': {
							fontWeight: 650,
						},
						pre: {
							color: theme('colors.white'),
							borderRadius: theme('borderRadius.xl'),
							//   padding: theme('padding.5'),
							boxShadow: theme('boxShadow.md'),
							display: 'flex',
							marginTop: `${20 / 14}em`,
							marginBottom: `${32 / 14}em`,
						},
						'p + pre': {
							marginTop: `${-4 / 14}em`,
						},
						'pre + pre': {
							marginTop: `${-16 / 14}em`,
						},
						'pre code': {
							flex: 'none',
							minWidth: '100%',
							backgroundColor: 'transparent',
						},
						table: {
							fontSize: theme('fontSize.sm')[0],
							lineHeight: theme('fontSize.sm')[1].lineHeight,
						},
						thead: {
							color: theme('colors.slate.700'),
							borderBottomColor: theme('colors.slate.200'),
						},
						'thead th': {
							paddingTop: 0,
							fontWeight: theme('fontWeight.semibold'),
						},
						'tbody tr': {
							borderBottomColor: theme('colors.slate.100'),
						},
						'tbody tr:last-child': {
							borderBottomWidth: '1px',
						},
						'tbody code': {
							fontSize: theme('fontSize.xs')[0],
						},
						'figure figcaption': {
							textAlign: 'center',
							fontStyle: 'italic',
						},
						'figure > figcaption': {
							marginTop: `${12 / 14}em`,
						},
					},
				},
				dark: {
					css: {
						color: theme('colors.slate.300'),
						'--tw-prose-lead': theme('colors.slate.400'),
						'h2, h3, h4, thead th': {
							color: theme('colors.indigo.400'),
						},
						'h2 small, h3 small, h4 small': {
							color: theme('colors.slate.400'),
						},
						kbd: {
							background: theme('colors.slate.700'),
							borderColor: theme('colors.slate.600'),
							color: theme('colors.slate.200'),
						},
						code: {
							color: theme('colors.slate.200'),
							backgroundColor: theme('colors.slate.900')
						},
						'pre code': {
							backgroundColor: 'transparent',
						},
						hr: {
							borderColor: theme('colors.slate.200'),
							opacity: '0.05',
						},
						pre: {
							boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.1)',
						},
						'--tw-prose-bullets': theme('colors.slate.500'),
						a: {
							color: theme('colors.white'),
							borderBottomColor: theme('colors.sky.400'),
						},
						strong: {
							color: theme('colors.slate.200'),
						},
						thead: {
							color: theme('colors.slate.300'),
							borderBottomColor: 'rgb(148 163 184 / 0.2)',
						},
						'tbody tr': {
							borderBottomColor: 'rgb(148 163 184 / 0.1)',
						},
						blockQuote: {
							color: theme('colors.white'),
						},
					},
				},
			}),
		},
	},
	plugins: [
		function ({ addVariant, matchUtilities, theme, addUtilities }) {
			matchUtilities(
				{
					"bg-signal": (value) => ({
						backgroundImage: `url("${svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="84" height="48" viewBox="0 0 84 48"><path d="M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z" fill="${value}" fill-rule="evenodd"/></svg>`
						)}")`,
					}),
					"bg-grid": (value) => ({
						backgroundImage: `url("${svgToDataUri(
						  `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill-rule="evenodd"><g fill="${value}"><path opacity=".5" d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z"/><path d="M6 5V0H5v5H0v1h5v94h1V6h94V5H6z"/></g></g></svg>`
						)}")`,
					}),
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
				},
				{
					values: flattenColorPalette(theme("backgroundColor")),
					type: "color",
				}
			);
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
		TypographyPlugin
	],
}
