import { css } from '@emotion/css';
import { COLORS, THEME } from '~shared/styles/theme';

export const elementStyle = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 10px;
	padding: 10px;
	width: 100%;
	border: 1px solid #ccc;
	border-radius: 5px;
`;

export const buttonGroupStyle = css`
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;

export const buttonStyle = css`
	background-color: ${COLORS.primary};
	color: white;
	border: none;
	padding: ${THEME.spaces.small};
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background-color: greenyellow;
		//background-color: darken(${COLORS.primary}, 10%);
	}
`;

export const descriptionStyle = css`
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
`;
