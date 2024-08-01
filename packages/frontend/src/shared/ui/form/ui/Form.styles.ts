import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const formContainerStyle = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 800px;
	background-color: ${colors.secondaryBgColor};
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const noStyleContainer = css``;
