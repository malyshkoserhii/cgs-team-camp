import { css } from '@emotion/css';
import { COLORS, THEME, BREAKPOINTS } from '~shared/styles/theme';

export const formStyle = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.spaces.medium};

	@media (max-width: ${BREAKPOINTS.mobile}) {
		gap: ${THEME.spaces.small};
	}
`;

export const inputStyle = css`
	padding: ${THEME.spaces.small};
	font-size: ${THEME.fontSizes.medium};
	border: 1px solid ${COLORS.primary};
	border-radius: 4px;
`;

export const buttonStyle = css`
	background-color: ${COLORS.primary};
	color: white;
	border: none;
	padding: ${THEME.spaces.small};
	border-radius: 4px;
	cursor: pointer;
	font-size: ${THEME.fontSizes.medium};

	&:hover {
		//background-color: darken(${COLORS.primary}, 10%);
	}
`;

export const fieldStyle = css`
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: ${THEME.fontSizes.medium};
`;

export const buttonGroupStyle = css`
	display: flex;
	gap: 10px;
`;

export const container = css`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const filedGroupWrapper = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;
