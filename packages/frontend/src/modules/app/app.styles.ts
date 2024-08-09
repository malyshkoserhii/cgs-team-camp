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
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100vh;
	max-width: 1200px;
	margin: 0 auto;
	padding: ${THEME.SPACING.LARGE};
`;
