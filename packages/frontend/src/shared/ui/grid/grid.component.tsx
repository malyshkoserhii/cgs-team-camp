import { css, cx } from '@emotion/css';
import { FunctionComponent, ReactElement } from 'react';
import { breakpoints } from '~shared/styles/breakpoints';

type ResponsiveColumns = {
	base?: number;
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
};

type ResponsiveGap = {
	base?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
};

type Props<T> = {
	items: T[];
	renderItem: FunctionComponent<T>;
	columns?: ResponsiveColumns;
	columnGap?: number | ResponsiveGap;
	rowGap?: number | ResponsiveGap;
	className?: string;
};

const generateGridStyles = (
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

export const AppGrid = <T extends { id: number }>({
	items,
	renderItem: Component,
	columns = { base: 1, xs: 2, md: 3, lg: 4 },
	columnGap = 8,
	rowGap = { base: 2, lg: 4 },
	className,
	...otherProps
}: Props<T>): ReactElement => {
	const gridStyles = generateGridStyles(columns, columnGap, rowGap);

	return (
		<ul className={cx(gridStyles, className)} {...otherProps}>
			{items.map((item, index) => {
				const id = item.id || `${index}-${new Date().getTime()}`;
				return <Component key={id} {...item} />;
			})}
		</ul>
	);
};
