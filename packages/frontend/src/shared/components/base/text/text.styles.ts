import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const textStyle = (size: string): string => css`
	color: ${colors.mainColor};
	font-size: ${size};
	margin: 0;
`;
