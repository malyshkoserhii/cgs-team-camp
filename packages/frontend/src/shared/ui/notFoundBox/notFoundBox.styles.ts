import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const containerStyle = css`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: ${colors.mainBgColor};
`;

export const contentStyle = css`
	text-align: center;
	background: ${colors.secondaryBgColor};
	border-radius: 8px;
	padding: 2rem;
	box-shadow: 0 4px 8px ${colors.blackCoral};
`;

export const titleStyle = css`
	font-size: 6rem;
	color: ${colors.errorColor};
	margin: 0;
`;

export const messageStyle = css`
	font-size: 1.5rem;
	color: ${colors.mainColor};
	margin-top: 1rem;
`;
