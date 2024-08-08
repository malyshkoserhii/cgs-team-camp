import { css } from '@emotion/css';

import { THEME, BREAKPOINTS, SIZES } from '~shared/styles/theme';

export const formStyle = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.spaces.medium};
	margin-top: ${SIZES.m};

	@media (max-width: ${BREAKPOINTS.mobile}) {
		gap: ${THEME.spaces.small};
	}
`;

export const buttonGroupStyle = css`
	display: flex;
	justify-content: space-between;
	gap: ${SIZES.m};
`;

export const container = css`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
