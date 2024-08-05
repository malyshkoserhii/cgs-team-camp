import { css } from '@emotion/css';
import { THEME, COLORS } from '~shared/styles/constants';

export const emptyStateStyles = css`
	text-align: center;
	padding: ${THEME.SPACING.LARGE};
	font-style: italic;
	color: ${COLORS.SECONDARY};
`;

export const tableStyles = css`
	display: table;
	width: 100%;
	border-collapse: collapse;
`;

export const headerStyles = css`
	display: table-row;
	background-color: ${COLORS.SECONDARY};
	color: white;
	font-weight: bold;

	span {
		display: table-cell;
		padding: ${THEME.SPACING.MEDIUM};
	}
`;

export const sliderStyles = css`
	display: flex;
	overflow-x: auto;
	scroll-snap-type: x mandatory;
	-webkit-overflow-scrolling: touch;
	scrollbar-width: none;
	-ms-overflow-style: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const listStyles = css`
	display: flex;
	flex-direction: column;
`;
