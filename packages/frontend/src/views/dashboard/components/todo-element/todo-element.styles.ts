import { css } from '@emotion/css';

import { mediaQuery } from '~/utils/mediaQuery';
import { THEME } from '~shared/styles/theme';

export const todoElementDesktop = css`
	display: block;
	${mediaQuery(THEME.breakpoints.tablet)(`
        display: none;
      `)}
	${mediaQuery(THEME.breakpoints.mobile)(`
        display: none;
      `)}
`;

export const todoElementTablet = css`
	display: none;
	${mediaQuery(THEME.breakpoints.tablet)(`
        padding: ${THEME.spacings.md} ${THEME.spacings.sm};
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${THEME.spacings.md};
        border: 1px solid ${THEME.colors.secondary};
        word-wrap: break-word;
        word-break: break-word;
        overflow-wrap: break-word;
        p {
          word-wrap: break-word;
          word-break: break-word;
          overflow-wrap: break-word;
        }
      `)}
	${mediaQuery(THEME.breakpoints.mobile)(`
        display: none;
      `)}
`;

export const actionButtonsTablet = css`
	display: flex;
	align-items: center;
	gap: ${THEME.spacings.sm};
`;

export const todoElementMobile = css`
	display: none;
	${mediaQuery(THEME.breakpoints.tablet)(`
        display: none;
      `)}
	${mediaQuery(THEME.breakpoints.mobile)(`
        display: flex;
        flex-direction: column;
        gap: ${THEME.spacings.sm};
        margin-bottom: ${THEME.spacings.md};
        padding-bottom: ${THEME.spacings.md};
        border-bottom: 1px solid ${THEME.colors.secondary};
        p {
          word-wrap: break-word;
          word-break: break-word;
          overflow-wrap: break-word;
        }
      `)}
`;
