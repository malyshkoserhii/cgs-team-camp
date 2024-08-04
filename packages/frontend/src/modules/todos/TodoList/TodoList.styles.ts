import { css } from '@emotion/css';
import { SIZES } from '~shared/styles/theme';
import { DEVICE } from '~shared/keys';

export const container = css`
	@media ${DEVICE.tablet} {
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
	}
`;

export const wrapper = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${SIZES.m};

	@media ${DEVICE.tablet} {
		flex-direction: row-reverse;
		justify-content: space-between;
		gap: ${SIZES.m};
	}
`;

export const searchInputStyle = css`
	padding: ${SIZES.xs};
	box-sizing: border-box;
	border: 1px solid blue;
`;

export const buttonGroupStyle = css`
	display: flex;
	gap: ${SIZES.m};
	margin-bottom: ${SIZES.m};
`;

export const todosContainer = css`
	display: flex;
	flex-direction: column;
	gap: ${SIZES.m};

	@media ${DEVICE.tablet} {
		display: block;
	}
`;
