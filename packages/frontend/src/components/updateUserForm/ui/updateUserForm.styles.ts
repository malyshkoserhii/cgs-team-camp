import { css } from '@emotion/css';
import { colors } from '~shared/styles';
import { spacingMap } from '~shared/styles/fontSizes';

export const dividerStyle = css`
	background: ${colors.accentColor};
	height: 2px;
	margin-top: ${spacingMap[500]};
	margin-bottom: ${spacingMap[500]};
`;
