import { css } from '@emotion/css';
import { THEME, COLORS } from '../../../shared/styles/constants';

export const checkboxStyles = css`
	margin-right: ${THEME.SPACING.SMALL};
`;

export const labelStyles = css`
	display: flex;
	align-items: center;
	font-size: ${THEME.FONT_SIZES.MEDIUM};
	color: ${COLORS.TEXT};
`;
