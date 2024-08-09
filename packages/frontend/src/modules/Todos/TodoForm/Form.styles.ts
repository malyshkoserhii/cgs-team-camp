import { css } from '@emotion/css';
import { BREAKPOINTS, SIZES } from '~shared/styles';

export const DialogContainer = css`
	min-height: 300px;
	margin-inline: ${SIZES.s};
	width: 300px;
	@media (min-width: ${BREAKPOINTS.tablet}) {
		width: 375px;
	}
	@media (min-width: ${BREAKPOINTS.desktop}) {
		min-height: 400px;
		width: 55vw;
	}
`;
export const CheckBoxContainer = css`
	display: flex;
	flex-direction: row !important;
	gap: ${SIZES.l};
`;
