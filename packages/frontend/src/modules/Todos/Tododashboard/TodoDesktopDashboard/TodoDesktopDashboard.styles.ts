import { css } from '@emotion/css';
import { SIZES, colors } from '~shared/styles';

export const tableStyles = css`
	width: 100%;
	border-collapse: collapse;

	padding: ${SIZES.xs};
	th,
	td {
		padding: ${SIZES.m};
		border: 2px solid black;
		text-align: left;
	}

	th {
		background-color: ${colors.arsenic};
		font-family: 'Montserrat', sans-serif;
		font-size: ${SIZES.xl};
		color: ${colors.lotion};
	}
`;
export const TableTitleColumn = css`
	font-family: 'Montserrat', sans-serif;
	font-size: ${SIZES.xl};
	font-weight: bold;
	width: 25%;
`;
export const DescriptionColumn = css`
	font-family: 'RobotoMono', sans-serif;
	font-size: ${SIZES.m};

	word-wrap: break-word;
	white-space: pre-wrap;
	overflow-wrap: break-word;
	word-break: break-word;
	width: 50%;
`;
export const ActionsColumn = css`
	width: 25%;
`;
