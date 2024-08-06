import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const switchStyles = css`
	margin-bottom: 0px;
	input:checked ~ .bp5-control-indicator {
		background: ${colors.successColor} !important;
	}
`;
