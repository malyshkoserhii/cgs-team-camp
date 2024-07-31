import { css } from '@emotion/css';

export const radioGroupWrapperStyle = css`
	display: flex;
	flex-direction: column;
	margin-bottom: 16px;
	padding: 8px;
	border: 1px solid #dcdcdc;
	border-radius: 4px;
	background-color: #fff;
	width: 100%;

	&.error {
		border-color: #e74c3c;
	}
`;
