import { cx } from '@emotion/css';
import { FunctionComponent, ReactElement, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';
import { useShowMore } from '~shared/hooks/useShowMore.hook';
import { breakpoints } from '~shared/styles/breakpoints';
import { Loader } from '../loader';
import { TodoItemHeading } from '../todo/todoItem/todoItemHeading.component';
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
	showMoreIsLoading?: boolean;
};

export const AppGrid = <T extends { id: number }>({
	items,
	renderItem: Component,
	columns = { base: 1, xs: 2, md: 3, lg: 4 },
	columnGap = 8,
	rowGap = { base: 2, lg: 4 },
	className,
	showMoreIsLoading,
	...otherProps
}: Props<T>): ReactElement => {
	const isTablet = useMediaQuery({
		query: `(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`,
	});
	const isMobileAndTablet = useMediaQuery({
		query: `(max-width: ${breakpoints.lg})`,
	});
	const showMore = useShowMore();
	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	useEffect(() => {
		if (inView && isMobileAndTablet) {
			showMore();
		}
	}, [inView, isMobileAndTablet, showMore]);

	if (isTablet) {
		return <TodoSwiper<T> items={items} component={Component} />;
	}

	return (
		<>
			<ul
				className={cx(
					generateGridStyles(columns, columnGap, rowGap),
					className,
				)}
				{...otherProps}
			>
				{!isMobileAndTablet && <TodoItemHeading />}
				{items.map((item, index) => {
					const id = item.id || `${index}-${new Date().getTime()}`;
					return <Component {...item} key={id} />;
				})}
			</ul>
			<div ref={ref} />
			{showMoreIsLoading && <Loader />}
		</>
	);
};
