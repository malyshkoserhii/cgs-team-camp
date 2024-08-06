import { css } from '@emotion/css';
import { BREAKPOINTS, COLORS, SIZES } from '~shared/styles/theme';
import { DEVICE } from '~shared/keys';

export const HeaderContainer = css`
	display: flex;
	margin: 0 auto;

	margin-bottom: ${SIZES.m};
	padding-inline: ${SIZES.m};
	padding-block: ${SIZES.m};
	font-size: ${SIZES.m};

	@media ${DEVICE.tablet} {
		width: 768px;
	}

	@media ${DEVICE.laptop} {
		max-width: ${BREAKPOINTS.tablet};
	}

	a {
		text-decoration: none;
		padding: ${SIZES.m};
		border: 1px solid ${COLORS.primary};
		border-radius: ${SIZES.m};
	}
`;

export const NavContainer = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

export const MainContainer = css`
	min-width: ${BREAKPOINTS.mobile};
	margin: 0 auto;

	@media (min-width: ${BREAKPOINTS.tablet}) {
		max-width: ${BREAKPOINTS.tablet};
	}
`;
