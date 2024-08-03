import { css } from '@emotion/css';

export const COLORS = {
	primary: '#0070f3',
	secondary: '#1c1c1c',
	philippineGray: '#8A8A8A',
	background: '#f0f0f0',
	text: '#333333',
	// додайте більше кольорів за необхідністю
};

export const FONTS = {
	body: 'Arial, sans-serif',
	heading: 'Georgia, serif',
	// додайте більше шрифтів за необхідністю
};

export const THEME = {
	fontSizes: {
		small: '12px',
		medium: '16px',
		large: '20px',
	},
	spaces: {
		small: '8px',
		medium: '16px',
		large: '24px',
	},
};

export const globalStyles = css`
	body {
		margin: 0;
		padding: 0;
		font-family: ${FONTS.body};
		background-color: ${COLORS.background};
		color: ${COLORS.text};
	}
`;

export const SIZES = Object.freeze({
	xxs: '4px',
	xs: '8px',
	s: '12px',
	m: '16px',
	l: '20px',
	xl: '24px',
	xxl: '28px',
	lineHeightS: '1.1',
	lineHeightM: '1.3',
	lineHeightl: '1.6',
});

export const BREAKPOINTS = Object.freeze({
	mobile: '320px',
	tablet: '768px',
	desktop: '1220px',
});
