import { css } from '@emotion/css';

import { mediaQuery } from '~/utils/mediaQuery';
import { THEME } from '~shared/styles/theme';

export const layoutStyles = () => {
	return css`
		padding: ${THEME.spacings.xl} ${THEME.spacings.lg};
		${mediaQuery(THEME.breakpoints.tablet)(`
            padding: ${THEME.spacings.lg} ${THEME.spacings.md};
          `)}
		${mediaQuery(THEME.breakpoints.mobile)(`
            padding: ${THEME.spacings.md} ${THEME.spacings.sm};
          `)}
	`;
};
