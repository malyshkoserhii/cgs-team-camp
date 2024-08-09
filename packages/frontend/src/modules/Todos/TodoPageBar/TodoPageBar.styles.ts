import { css } from '@emotion/css';
import { BREAKPOINTS, SIZES, colors } from '~shared/styles';

export const BarContainer = css`
	display: flex;
	flex-direction: column-reverse;
	gap: ${SIZES.l};
	padding-inline: ${SIZES.s};
	margin-bottom: ${SIZES.l};

	@media (min-width: ${BREAKPOINTS.tablet}) {
		flex-direction: row;
		justify-content: space-between;
	}
`;

export const FilterInput = css`
	padding: ${SIZES.xxs};
	box-shadow: 3px 3px 5px grey;
	font-size: ${SIZES.m};
	font-weight: bold;
	display: block;
	outline: none;
	border: 2px solid black;
	border-radius: 10px;
	background-color: ${colors.lotion};
	width: 250px;
	height: 40px;
	&:hover,
	:active,
	:focus {
		border: 2px solid ${colors.oceanBlue};
	}

	@media (min-width: ${BREAKPOINTS.desktop}) {
		width: 350px;
	}
`;
export const ButtonsContainer = css`
	display: flex;
	gap: ${SIZES.s};
	flex-wrap: wrap;
`;

export const SearchInput = css`
	min-width: 320px;
`;
