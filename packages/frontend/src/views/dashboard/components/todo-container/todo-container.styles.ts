import { css } from '@emotion/css';

import { mediaQuery } from '~/utils/mediaQuery';
import { THEME } from '~shared/styles/theme';

export const desktopContainer = css`
	display: block;
	${mediaQuery(THEME.breakpoints.tablet)(`
        display: none;
      `)}
	${mediaQuery(THEME.breakpoints.mobile)(`
        display: none;
      `)}
`;

export const tabletContainer = css`
	display: none;
	${mediaQuery(THEME.breakpoints.tablet)(`
        display: block;
      `)}
	${mediaQuery(THEME.breakpoints.mobile)(`
        display: none;
      `)}
`;

export const mobileContainer = css`
	display: none;
	${mediaQuery(THEME.breakpoints.tablet)(`
        display: none;
      `)}
	${mediaQuery(THEME.breakpoints.mobile)(`
        display: block;
      `)}
`;
