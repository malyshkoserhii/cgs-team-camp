import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles/theme';

export const filedGroupWrapper = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const inputStyle = css`
	padding: ${THEME.spaces.small};
	font-size: ${THEME.fontSizes.medium};
	border: 1px solid ${COLORS.primary};
	border-radius: 4px;
`;
