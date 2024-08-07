import { css } from '@emotion/css';
import { SIZES } from '~shared/styles';

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
	border: 1px solid black;
	border-radius: 4px;

	&:focus,
	&:hover {
		border-color: blue;
		outline: none;
	}
`;
export const ErrorSpanStyle = css`
	color: red;
`;
