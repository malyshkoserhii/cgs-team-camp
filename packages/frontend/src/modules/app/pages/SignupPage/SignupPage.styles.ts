import { css } from '@emotion/css';
import { THEME, FONTS } from '~shared/styles/constants';

export const LinkContainerStyles = css`
	display: flex;
	gap: ${THEME.SPACING.SMALL};
	margin-bottom: ${THEME.SPACING.MEDIUM};
`;

export const messageStyles = css`
	margin-top: ${THEME.SPACING.MEDIUM};
	justify-content: center;
	font-family: ${FONTS.MAIN};
	font-size: ${THEME.FONT_SIZES.LARGE};
`;
