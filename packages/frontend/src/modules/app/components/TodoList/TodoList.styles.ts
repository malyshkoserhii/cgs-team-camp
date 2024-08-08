import { css } from '@emotion/css';
import { THEME, COLORS } from '~shared/styles/constants';

export const emptyStateStyles = css`
	text-align: center;
	padding: ${THEME.SPACING.LARGE};
	font-style: italic;
	color: ${COLORS.SECONDARY};
`;
