import { css } from '@emotion/css';
import { BREAKPOINTS, SIZES } from '~shared/styles';

export const MainContainer = css`
	min-width: ${BREAKPOINTS.mobile};
	margin: 0 auto;
	padding: ${SIZES.s};
	@media (min-width: ${BREAKPOINTS.tablet}) {
		max-width: ${BREAKPOINTS.tablet};
	}
	@media (min-width: ${BREAKPOINTS.desktop}) {
		max-width: ${BREAKPOINTS.desktop};

		padding-inline: ${SIZES.m};
	}
`;
export const HeaderContainer = css`
	display: flex;

	justify-content: center;
	gap: 100px;
	margin-bottom: ${SIZES.xxl};
	padding-inline: ${SIZES.xxl};
	padding-block: ${SIZES.m};
	a {
		text-decoration: none;
		padding: ${SIZES.m};
		@media (min-width: ${BREAKPOINTS.tablet}) {
			font-size: ${SIZES.xl};
		}
		@media (min-width: ${BREAKPOINTS.desktop}) {
			font-size: ${SIZES.xxl};
		}
	}
`;
