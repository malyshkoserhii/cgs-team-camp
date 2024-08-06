import { css } from '@emotion/css';
import { DEVICE } from '~shared/keys';
import { COLORS } from '~shared/styles/theme';

export const linkStyle = css`
	text-decoration: none;
	color: ${COLORS.primary};
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
