import { css } from '@emotion/css';
import { DEVICE } from '~shared/keys';

export const linkStyle = css`
	text-decoration: none;
	color: blue;
	&:hover {
		color: darkblue;
	}
	grid-row: 1 / 2;
	grid-column: 2 / 3;
	justify-self: end;

	@media ${DEVICE.tablet} {
		grid-row: 1 / 2;
		grid-column: 2 / 3;
		justify-self: start;
	}
`;
