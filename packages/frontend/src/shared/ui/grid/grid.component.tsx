import { cx } from '@emotion/css';
import { FunctionComponent, ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '~shared/styles/breakpoints';
import { TodoSwiper } from '../todo/todoSwiper';
import { generateGridStyles } from './grid.styles';

export type ResponsiveColumns = {
	base?: number;
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
};

export type ResponsiveGap = {
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

export const AppGrid = <T extends { id: number }>({
	items,
	renderItem: Component,
	columns = { base: 1, xs: 2, md: 3, lg: 4 },
	columnGap = 8,
	rowGap = { base: 2, lg: 4 },
	className,
	...otherProps
}: Props<T>): ReactElement => {
	const isTablet = useMediaQuery({
		query: `(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`,
	});

	if (isTablet) {
		return <TodoSwiper<T> items={items} component={Component} />;
	}

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
