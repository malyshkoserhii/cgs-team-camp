import { css } from '@emotion/css';
import { colors } from './colors';
import { fontSizeMap, spacingMap } from './fontSizes';

export const labelStyle = css`
	font-size: ${fontSizeMap[200]};
`;

export const emptyMessageStyle = css`
	font-size: ${fontSizeMap[100]};
	margin-top: 1px;
	margin-bottom: 0;
	color: ${colors.errorColor};
`;

export const boxStyle = css`
	font-size: ${fontSizeMap[100]};
	height: 24px;
	color: ${colors.errorColor};
`;

export const asteriskStyle = css`
	color: ${colors.errorColor};
	margin-left: ${spacingMap[100]};
	margin-bottom: 5px;
`;
