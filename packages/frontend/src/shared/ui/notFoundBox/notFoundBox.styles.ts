import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const containerStyle = (fullHeight: boolean): string => css`
	display: flex;
	align-items: center;
	justify-content: center;
	height: ${fullHeight ? '100vh' : 'auto'};
`;

export const contentStyle = css`
	text-align: center;
	background: ${colors.secondaryBgColor};
	border-radius: 8px;
	padding: 2rem;
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
