import { css } from '@emotion/css';
import { THEME } from '~shared/styles/constants';

export const textareaWrapperStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.SPACING.SMALL};
	width: 100%;
`;

export const textareaStyles = css`
	height: 40px;
	padding: 8px;
	border: 2px solid ${THEME.COLORS.BORDER};
	border-radius: 8px;
	resize: vertical;
	min-height: 100px;
	max-height: 300px;
`;
