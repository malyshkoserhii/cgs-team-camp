import { css } from '@emotion/css';
import { COLORS, SIZES } from '~shared/styles/theme';
import { DEVICE } from '~shared/keys';

export const container = css`
	padding: ${SIZES.m};
`;

export const wrapper = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${SIZES.m};

	@media ${DEVICE.tablet} {
		justify-content: space-between;
		gap: ${SIZES.m};
	}
`;

export const searchInputStyle = css`
	margin-right: ${SIZES.m};
	padding: ${SIZES.xs};

	box-sizing: border-box;
	border: 1px solid ${COLORS.primary};
	border-radius: ${SIZES.m};
`;

export const buttonGroupStyle = css`
	display: flex;
	gap: ${SIZES.xs};
	margin-bottom: ${SIZES.m};
`;

export const wrapperFlex = css`
	@media ${DEVICE.tablet} {
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
	}

	@media ${DEVICE.laptop} {
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
	}
`;

export const wrapperPagination = css`
	display: flex;
	justify-content: space-between;
	margin-top: ${SIZES.m};
`;
