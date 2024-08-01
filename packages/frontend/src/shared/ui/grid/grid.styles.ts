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

			li {
				border-radius: 8px;
				padding: 10px;
			}

			li:nth-child(1n) {
				background: #383838;
			}

			li:nth-child(2n) {
				background: #484848;
			}
		}

		@media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
			display: flex;
			flex-wrap: nowrap;
			overflow-x: auto;
			gap: ${typeof columnGap === 'object' ? columnGap?.md : columnGap}px;
			align-items: flex-start;
			& > * {
				flex: 0 0
					calc(
						33.333% -
							${typeof columnGap === 'object'
								? columnGap?.md
								: columnGap}px
					);
			}
		}

		@media (max-width: ${breakpoints.sm}) {
			grid-template-columns: 1fr;
			overflow-x: hidden;
		}
	`;
};
