module.exports = {
	darkMode: 'class',
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
		},
		fontFamily: {
			sans: 'Mariupol, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
		},
		extend: {
			colors: {
				'cobalt': {
					50: '#e6f2ff',
					100: '#b4d9fe',
					200: '#82bffd',
					300: '#50a5fc',
					400: '#1e8cfb',
					500: '#0472e1',
					600: '#0359af',
					700: '#023f7d',
					800: '#01264b',
					900: '#000d19',
				},
				'redtape': {
					50: '#fde7ec',
					100: '#f9b8c5',
					200: '#f5899e',
					300: '#f15a77',
					400: '#ed2b50',
					500: '#d41236',
					600: '#a50e2a',
					700: '#760a1e',
					800: '#470612',
					900: '#180206',
				},
				zinc: {
					1000: '#0c0c0d'
				}
			},
		},

	},
}
