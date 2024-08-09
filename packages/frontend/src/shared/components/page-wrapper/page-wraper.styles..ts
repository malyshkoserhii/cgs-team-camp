import { css } from '@emotion/css';
import { SIZES } from '~shared/styles';
export const PageLoader = css`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-block: auto;
	width: 100%;
	height: 100%;
	div > div > svg {
		width: 100px;
		height: 80%;
	}
`;

export const PageHeader = css`
	text-align: center;
	font-size: ${SIZES.xl};
	margin-inline: auto;
	margin-block: ${SIZES.xl};
`;
