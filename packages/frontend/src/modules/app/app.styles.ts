import { FONTS, COLORS, THEME } from '~shared/styles/constants';
import { css } from '@emotion/css';

export const globalStyles = css`
	body {
		font-family: ${FONTS.MAIN};
		background-color: ${COLORS.BACKGROUND};
		color: ${COLORS.TEXT};
		margin: 0;
		padding: 0;
	}
`;

export const appStyles = css`
	max-width: 1200px;
	margin: 0 auto;
	padding: ${THEME.SPACING.LARGE};
`;

export const navStyles = css`
	display: flex;
	justify-content: flex-start;
	margin-bottom: ${THEME.SPACING.LARGE};
`;

export const linkStyles = css`
	color: ${COLORS.PRIMARY};
	text-decoration: none;
	font-size: ${THEME.FONT_SIZES.MEDIUM};
	margin-right: ${THEME.SPACING.MEDIUM};
	&:hover {
		text-decoration: underline;
	}
`;

export const contentStyles = css`
	background-color: white;
	border-radius: 4px;
	padding: ${THEME.SPACING.LARGE};
	box-shadow:
		0 1px 3px rgba(0, 0, 0, 0.12),
		0 1px 2px rgba(0, 0, 0, 0.24);
`;
