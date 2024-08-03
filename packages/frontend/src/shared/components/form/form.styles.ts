import { css } from '@emotion/css';
import { BREAKPOINTS, SIZES, colors } from '~shared/styles';

export const FormContainer = css`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: ${SIZES.xs};
	gap: ${SIZES.s};
	align-items: center;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	label {
		font-family: 'Montserrat', sans-serif;
		font-weight: bold;
		font-size: ${SIZES.l};
		line-height: ${SIZES.lineHeightM};
	}
	input,
	textarea {
		width: 200px;
		line-height: ${SIZES.lineHeightM};
		font-size: ${SIZES.m};
		padding: ${SIZES.s};
		border: 1px solid black;
	}
	div {
		display: flex;
		flex-direction: column;
		span {
			width: 200px;
			margin-top: ${SIZES.s};
			line-height: ${SIZES.lineHeightM};
			font-size: ${SIZES.m};
			color: ${colors.maximumRedPurple};
		}
	}
	@media (min-width: ${BREAKPOINTS.tablet}) {
		input,
		textarea {
			width: 300px;
		}
		div span {
			width: 300px;
		}
	}
	@media (min-width: ${BREAKPOINTS.desktop}) {
		input,
		textarea {
			width: 400px;
		}
		div span {
			width: 400px;
		}
	}
`;
export const ErrorStlyes = css`
	color: red;
	border-color: red !important;
`;
