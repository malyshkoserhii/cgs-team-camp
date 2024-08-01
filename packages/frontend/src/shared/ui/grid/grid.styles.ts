import { css } from '@emotion/css';
import { breakpoints } from '~shared/styles/breakpoints';
import { ResponsiveColumns, ResponsiveGap } from './grid.component';

export const generateGridStyles = (
	columns?: ResponsiveColumns,
	columnGap?: number | ResponsiveGap,
	rowGap?: number | ResponsiveGap,
): string => {
	return css`
		display: grid;
		gap: ${typeof columnGap === 'number'
				? columnGap
				: columnGap?.base || 0}px
			${typeof rowGap === 'number' ? rowGap : rowGap?.base || 0}px;

		@media (min-width: ${breakpoints.lg}) {
			grid-template-columns: 1fr;
		}

		@media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
			display: flex;
			overflow-x: auto;
			flex-direction: row;
			gap: ${typeof columnGap === 'object' ? columnGap?.md : columnGap}px;
			align-items: flex-start;
		}

		@media (max-width: ${breakpoints.sm}) {
			grid-template-columns: 1fr;
			overflow-x: hidden;
		}
	`;
};
