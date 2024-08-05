import { css } from '@emotion/css';
import { ReactNode } from 'react';
import { colors } from '~shared/styles';

export const buttonStyle = css`
	color: ${colors.mainColor} !important;
	background: ${colors.accentColor} !important;
	border-radius: 10px;

	&:hover {
		opacity: 0.9;
	}
	&:active {
		opacity: 0.9;
	}
	&:disabled {
		background: ${colors.disabledColor} !important;
		color: ${colors.disabledTextColor} !important;
		cursor: not-allowed;
		opacity: 0.6;
	}
`;

export const outlineButtonStyle = css`
	color: ${colors.accentColor};
	background: transparent !important;
	border: 1px solid ${colors.accentColor} !important;
	border-radius: 10px;
	transition: all 0.3s ease;

	&:hover {
		background: ${colors.accentColor} !important;
		color: ${colors.mainColor} !important;
		border: 1px solid transparent !important;
	}
	&:active {
		background: ${colors.accentColor} !important;
		color: ${colors.mainColor} !important;
		opacity: 0.9;
	}
	&:disabled {
		color: ${colors.disabledColor} !important;
		border: 1px solid ${colors.disabledColor} !important;
		cursor: not-allowed;
		opacity: 0.6;
	}
`;

export const clearButtonStyle = css`
	color: ${colors.accentColor};
	background: transparent !important;
	border: none !important;
	box-shadow: none !important;

	&:hover {
		background: transparent !important;
		color: ${colors.accentColor};
	}
	&:active {
		background: transparent !important;
		color: ${colors.accentColor};
		opacity: 0.9;
	}
	&:disabled {
		color: ${colors.disabledColor} !important;
		cursor: not-allowed;
		opacity: 0.6;
	}
`;

export const fullWidthStyle = (icon: ReactNode): string => css`
	display: flex;
	justify-content: ${icon ? 'space-between' : 'center'};
	width: 100%;
`;

export const iconStyle = css`
	.bp5-icon {
		color: ${colors.mainColor};
	}
`;
