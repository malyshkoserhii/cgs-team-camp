import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const formWrapperStyles = css`
	padding: ${THEME.spacings.md};
	background-color: ${THEME.colors.background};
	display: grid;
	grid-template-columns: 1fr;
	gap: 6px;
`;
