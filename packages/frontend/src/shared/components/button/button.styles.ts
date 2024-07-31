import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const buttonStyle = css`
	color: white !important;
	background: ${colors.accentColor} !important;
	border-radius: 10px;

	&:hover {
		opacity: 0.9;
	}
	&:active {
		opacity: 0.9;
	}
`;
