import { css } from '@emotion/css';
import { SIZES } from '~shared/styles/theme';

export const btnAddNewStyle = css`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 20px;
`;

export const searchInputStyle = css`
	padding: 8px;
	margin-bottom: 16px;
	box-sizing: border-box;
	border: 1px solid blue;
`;

export const buttonGroupStyle = css`
	display: flex;
	gap: ${SIZES.m};
`;
