import { css } from '@emotion/css';

export const todoBox = css`
	@media (380px < width < 1220px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30px;
		padding: 20px;
		background-color: #b0cdcb;
		border: 2px solid red;
		border-radius: 16px;
		width: 300px;
	}
`;

export const todoButtonsBox = css`
	display: flex;
	justify-content: space-between;

	width: 100%;
`;

export const todoDescription = css`
	word-break: break-all;
	white-space: normal;
`;
