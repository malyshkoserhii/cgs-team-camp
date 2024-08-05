import { css } from '@emotion/css';
import { THEME, COLORS } from '../../styles/constants';

export const inputStyles = css`
	width: 100%;
	padding: ${THEME.SPACING.MEDIUM};
	margin-bottom: ${THEME.SPACING.MEDIUM};
	border: 1px solid ${COLORS.BORDER};
	border-radius: 4px;
	font-size: ${THEME.FONT_SIZES.MEDIUM};
	&:focus {
		outline: none;
		border-color: ${COLORS.PRIMARY};
	}
`;

export const errorMessageStyles = css`
	color: red;
	font-size: 12px;
	margin-top: 4px;
`;
