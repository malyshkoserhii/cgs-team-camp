import { css } from '@emotion/css';
import { BREAKPOINTS, COLORS, SIZES } from '~shared/styles/theme';

export const MainContainer = css`
	min-width: ${BREAKPOINTS.mobile};
	margin: 0 auto;
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
	margin-bottom: ${SIZES.m};
	padding-inline: ${SIZES.m};
	padding-block: ${SIZES.m};
	a {
		text-decoration: none;
		padding: ${SIZES.m};
		border: 1px solid ${COLORS.primary};
		border-radius: ${SIZES.m};
		@media (min-width: ${BREAKPOINTS.tablet}) {
			font-size: ${SIZES.m};
		}
		@media (min-width: ${BREAKPOINTS.desktop}) {
			font-size: ${SIZES.m};
		}
	}
`;

export const NavContainer = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;
