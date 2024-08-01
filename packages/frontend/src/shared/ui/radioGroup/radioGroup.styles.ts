import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const radioGroupWrapperStyle = css`
	display: flex;
	color: ${colors.mainColor};
	flex-direction: row;
	padding: 8px;
	width: 100%;

	&.error {
		border-color: #e74c3c;
	}
`;
