import { css } from '@emotion/css';
import { THEME, COLORS } from '~shared/styles/constants';

export const carouselStyles = css`
	display: flex;
	width: 70%;
	min-width: 300px;
	align-items: center;
	justify-content: space-between;
	padding: ${THEME.SPACING.MEDIUM};
`;

export const cardStyles = css`
	flex: 1;
	margin: 0 ${THEME.SPACING.MEDIUM};
	background-color: ${COLORS.BACKGROUND};
	border-radius: 8px;
	padding: ${THEME.SPACING.MEDIUM};
`;

export const rightControlsStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.SPACING.SMALL};
`;
