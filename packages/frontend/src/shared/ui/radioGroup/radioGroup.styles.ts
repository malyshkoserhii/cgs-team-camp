import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const radioGroupWrapperStyle = css`
	display: flex;
	color: ${colors.mainColor};
	flex-direction: row;
	border: 2px solid ${colors.accentColor};
	border-radius: 10px;
	padding: 8px;

	&.error {
		border-color: #e74c3c;
	}
`;

export const radioStyle = css`
	margin: 0;
`;
