import { css } from '@emotion/css';
import { colors } from '~shared/styles';
import { spacingMap } from '~shared/styles/fontSizes';

export const formContainerStyle = css`
	margin-left: auto;
	margin-right: auto;
	max-width: 800px;
	width: 100%;
	background-color: ${colors.secondaryBgColor};
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const formButtonStyle = css`
	text-align: right;
	color: ${colors.mainColor};
	margin-top: ${spacingMap[300]};
`;

export const forgotLinkStyle = css`
	color: ${colors.mainColor};
	margin-bottom: ${spacingMap[300]};
`;
