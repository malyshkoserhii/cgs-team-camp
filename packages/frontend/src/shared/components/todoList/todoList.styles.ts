import { css } from '@emotion/css';

export const todoListStyles = (isDesktop: boolean): string => css`
	display: flex;
	flex-direction: ${isDesktop ? 'row' : 'collumn'};
	gap: 20px;
	flex-wrap: wrap;
`;
