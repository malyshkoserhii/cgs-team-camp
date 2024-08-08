import { css } from '@emotion/css';
import { THEME, COLORS } from '~shared/styles/constants';

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
