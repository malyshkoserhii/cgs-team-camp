import { css } from '@emotion/css';
import { BREAKPOINTS, SIZES, colors } from '~shared/styles';

export const TodoItemContainer = css`
	display: flex;
	flex-direction: column;
	gap: ${SIZES.s};
	margin-bottom: ${SIZES.xs};
	padding: ${SIZES.m};
	p {
		word-wrap: break-word;
		white-space: pre-wrap;
		overflow-wrap: break-word;
		word-break: break-word;
	}

	@media (min-width: ${BREAKPOINTS.tablet}) {
		gap: ${SIZES.m};
		margin-bottom: ${SIZES.m};
	}
	@media (min-width: ${BREAKPOINTS.desktop}) {
		gap: ${SIZES.l};
		margin-bottom: ${SIZES.l};
	}
`;

export const TodoButtonsContainer = css`
	display: flex;
	flex-direction: row;
	gap: ${SIZES.xs};
	align-items: center;
`;
export const TodoLink = css`
	width: fit-content;
	min-width: 30px;
	padding: ${SIZES.xs};
	font-size: ${SIZES.xs};
	font-weight: 700;
	color: ${colors.white};
	background-color: ${colors.majorelleBlue};
	border: none;
	border-radius: ${SIZES.m};
	box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.06);
	text-align: center;
	transition: all 0.3s ease;
	cursor: pointer;
	:hover,
	:focus {
		color: ${colors.lotion};
		background-color: ${colors.blueLight};
		text-decoration: none;
		transition: all 0.3s ease;
	}

	@media (min-width: ${BREAKPOINTS.tablet}) {
		font-size: ${SIZES.m};
		padding: ${SIZES.s};
	}
	@media (min-width: ${BREAKPOINTS.desktop}) {
		font-size: ${SIZES.m};
	}
`;
export const TodoSwitch = css`
	display: flex;
	align-self: center;
	margin-left: auto;

	margin-top: ${SIZES.xs};
`;
export const BigTodoContainer = css`
	gap: 40px;
	height: 400px;
	padding-inline: ${SIZES.xl};
	button,
	a {
		scale: 1.2;
	}
	div {
		gap: ${SIZES.xl};
	}
	h3 {
		padding-top: ${SIZES.xl};
		font-size: ${SIZES.xxl};
	}
`;
export const nonFocusable = css`
	pointer-events: none;
`;
