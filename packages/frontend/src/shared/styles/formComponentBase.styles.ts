import { css } from '@emotion/css';
import { colors } from './colors';
import { fontSizeMap, spacingMap } from './fontSizes';

export const labelStyle = css`
	font-size: ${fontSizeMap[200]};
	margin-bottom: ${spacingMap[200]};
`;

export const emptyMessageStyle = css`
	color: ${colors.errorColor};
	font-size: ${fontSizeMap[100]};
	margin-top: 1px;
	margin-bottom: 0;
`;

export const boxStyle = css`
	height: 24px;
`;

export const asteriskStyle = css`
	color: ${colors.errorColor};
	margin-left: ${spacingMap[100]};
	margin-bottom: 5px;
`;
