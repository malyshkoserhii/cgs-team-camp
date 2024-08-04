export const THEME = {
	colors: {
		primary: '#BEC6FB',
		secondary: '#8A8A8A',
		background: '#F8F8F8',
		text: '#000',
		border: '#D1D50A',
		white: '#fff',
	},

	fonts: {
		regular: 'Manrope, sans-serif',
		bold: 'Manrope Bold, sans-serif',
	},

	fontSizes: {
		small: '12px',
		medium: '16px',
		large: '24px',
		xlarge: '32px',
	},

	spacing: {
		small: '8px',
		medium: '16px',
		large: '24px',
		xlarge: '32px',
	},

	borders: {
		radius: '4px',
		width: '1px',
		color: '#ddd',
	},

	shadows: {
		small: '0px 1px 2px rgba(0, 0, 0, 0.1)',
		medium: '0px 2px 4px rgba(0, 0, 0, 0.2)',
		large: '0px 4px 8px rgba(0, 0, 0, 0.3)',
	},
};

export type ThemeType = typeof THEME;
