import '@emotion/react';

interface MyTheme {
	colors: {
		primary: string;
		secondary: string;
		success: string;
		warning: string;
		danger: string;
		background: string;
		textPrimary: string;
		textSecondary: string;
		white: string;
		light: string;
	};
	fonts: {
		primary: string;
		secondary: string;
		heading: string;
	};
	fontSizes: {
		small: string;
		medium: string;
		large: string;
		xlarge: string;
	};
	fontWeights: {
		light: number;
		regular: number;
		medium: number;
		semibold: number;
		bold: number;
	};
	spacings: {
		xs: string;
		sm: string;
		md: string;
		lg: string;
		xl: string;
	};
	breakpoints: {
		mobile: string;
		tablet: string;
		desktop: string;
	};
}

declare module '@emotion/react' {
	export interface Theme extends MyTheme {}
}
