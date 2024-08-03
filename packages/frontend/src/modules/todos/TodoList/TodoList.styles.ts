import { css } from '@emotion/css';
import { SIZES } from '~shared/styles/theme';

export const wrapper = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;

export const searchInputStyle = css`
	padding: 8px;
	box-sizing: border-box;
	border: 1px solid blue;
`;

export const buttonGroupStyle = css`
	display: flex;
	gap: ${SIZES.m};
	justify-content: space-around;
	margin-bottom: ${SIZES.m};
`;
