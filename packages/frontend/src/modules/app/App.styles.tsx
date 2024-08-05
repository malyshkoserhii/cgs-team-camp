import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const appContainerStyles = css`
	font-family: ${THEME.fonts.regular};
	color: ${THEME.colors.text};
	background-color: ${THEME.colors.background};
	padding: ${THEME.spacing.large};
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

export const headerStyles = css`
	background-color: ${THEME.colors.primary};
	color: ${THEME.colors.white};
	padding: ${THEME.spacing.medium};
	border-radius: ${THEME.borders.radius};
	text-align: center;
	margin-bottom: ${THEME.spacing.large};
`;

export const mainStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const titleStyles = css`
	font-size: ${THEME.fontSizes.large};
	margin: 0;
`;
