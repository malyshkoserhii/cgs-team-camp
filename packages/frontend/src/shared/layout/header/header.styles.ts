import { css } from '@emotion/css';
import { mediaQuery } from '~/utils/mediaQuery';
import { THEME } from '~shared/styles/theme';

export const headerStyles = (): string => {
	return css`
		display: flex;
		align-items: center;
		justify-content: flex-end;
		border-bottom: 1px solid ${THEME.colors.secondary};
		padding: ${THEME.spacings.lg};
		${mediaQuery(THEME.breakpoints.tablet)(`
            padding: ${THEME.spacings.md};
          `)}
		${mediaQuery(THEME.breakpoints.mobile)(`
            padding:${THEME.spacings.sm};
          `)}
	`;
};

export const buttonGroupWrapper = (): string => {
	return css`
		display: flex;
		gap: 8px;
	`;
};
