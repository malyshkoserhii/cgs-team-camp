import { css } from '@emotion/css';
import { THEME, COLORS, FONTS } from '../../../shared/styles/constants';

export const formContainerStyles = css`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	min-height: 75vh;
	background-color: ${COLORS.BACKGROUND};
`;

export const formStyles = css`
	background-color: white;
	padding: ${THEME.SPACING.LARGE};
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 400px;
`;

export const titleStyles = css`
	color: ${COLORS.PRIMARY};
	font-family: ${FONTS.MAIN};
	font-size: ${THEME.FONT_SIZES.LARGE};
	margin-bottom: ${THEME.SPACING.MEDIUM};
	text-align: center;
`;

export const checkboxContainerStyles = css`
	display: flex;
	justify-content: space-between;
	margin-bottom: ${THEME.SPACING.MEDIUM};
`;

export const buttonStyles = css`
	width: 100%;
	padding: ${THEME.SPACING.MEDIUM};
	background-color: ${COLORS.PRIMARY};
	color: white;
	border: none;
	border-radius: 4px;
	font-size: ${THEME.FONT_SIZES.MEDIUM};
	cursor: pointer;
	transition: background-color 0.3s ease;
	&:hover {
		background-color: ${COLORS.SECONDARY};
	}
`;

export const errorMessageStyles = css`
	color: red;
	font-size: 14px;
	margin-top: 10px;
	margin-bottom: 10px;
`;
