import { css } from '@emotion/css';
import { colors, SIZES } from '~shared/styles';

export const UtilLabelStyles = css`
	font-family: 'Montserrat', sans-serif;
	font-weight: bold;
	font-size: ${SIZES.l};
	line-height: ${SIZES.lineHeightM};
	margin-left: auto;
	margin-right: auto;
	margin-bottom: ${SIZES.s};
`;
export const UtilInputStyles = css`
	width: 100%;
	padding: ${SIZES.s};
	font-size: ${SIZES.m};
	border: 2px solid black;
	border-radius: 16px;

	&:focus,
	&:hover {
		border-color: ${colors.oceanBlue};
	}
`;
export const ErrorSpanStyle = css`
	color: inherit;
`;
