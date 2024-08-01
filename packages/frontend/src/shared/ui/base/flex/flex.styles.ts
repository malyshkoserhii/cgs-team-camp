import { css } from '@emotion/css';

export const baseStyle = css`
	display: flex;
`;

export const directionStyle = (direction: 'row' | 'column'): string => css`
	flex-direction: ${direction};
`;

export const alignStyle = (
	align: 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch',
): string => css`
	align-items: ${align};
`;

export const justifyStyle = (
	justify:
		| 'flex-start'
		| 'center'
		| 'flex-end'
		| 'space-between'
		| 'space-around'
		| 'space-evenly',
): string => css`
	justify-content: ${justify};
`;

export const wrapStyle = (
	wrap: 'nowrap' | 'wrap' | 'wrap-reverse',
): string => css`
	flex-wrap: ${wrap};
`;

export const gapStyle = (gap: string): string => css`
	gap: ${gap};
`;
