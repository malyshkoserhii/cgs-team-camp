import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const headerStyle = (size: string): string => css`
	color: ${colors.mainColor};
	font-size: ${size};
	font-weight: bold;
`;
