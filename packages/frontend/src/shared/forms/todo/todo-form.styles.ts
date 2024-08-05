import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const formWrapperStyles = css`
	padding: ${THEME.spacings.md};
	background-color: ${THEME.colors.background};
	display: grid;
	grid-template-columns: 1fr;
	gap: 6px;
`;

export const actionButtonsWrapper = css`
	display: flex;
	justify-content: flex-end;
	gap: 10px;
`;
