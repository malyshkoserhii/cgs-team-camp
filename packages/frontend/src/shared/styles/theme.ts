// export const COLORS = Object.freeze({
// 	primary: '#D50A84',
// 	secondary: '#8A8A8A',
// 	background: '#FAFAFA',
// 	text: '#0B183B',
// 	white: '#fff',
// 	black: '#000',
// 	// Add other colors as needed
// });

// export const FONTS = Object.freeze({
// 	primary: 'Manrope, sans-serif',
// 	secondary: 'Manrope Bold, sans-serif',
// 	// Add other font families as needed
// });

// export const THEME = Object.freeze({
// 	colors: COLORS,
// 	fonts: FONTS,
// 	spacing: (factor: number) => `${factor * 8}px`,
// 	// Add other theme properties as needed
// });

export const THEME = {
	// Colors
	colors: {
		primary: '#D50A84',
		secondary: '#8A8A8A',
		background: '#FAFAFA',
		text: '#000',
		border: '#D1D50A',
		white: '#fff',
		// Add more colors as needed
	},

	// Fonts
	fonts: {
		regular: 'Manrope, sans-serif',
		bold: 'Manrope Bold, sans-serif',
		// Add more fonts as needed
	},

	// Font Sizes
	fontSizes: {
		small: '12px',
		medium: '16px',
		large: '24px',
		xlarge: '32px',
		// Add more font sizes as needed
	},

	// Spacing
	spacing: {
		small: '8px',
		medium: '16px',
		large: '24px',
		xlarge: '32px',
		// Add more spacing sizes as needed
	},

	// Borders
	borders: {
		radius: '4px',
		width: '1px',
		color: '#ddd',
		// Add more border styles as needed
	},

	// Shadows
	shadows: {
		small: '0px 1px 2px rgba(0, 0, 0, 0.1)',
		medium: '0px 2px 4px rgba(0, 0, 0, 0.2)',
		large: '0px 4px 8px rgba(0, 0, 0, 0.3)',
		// Add more shadow styles as needed
	},
};

export type ThemeType = typeof THEME;
