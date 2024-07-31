import { css, cx } from '@emotion/css';
import { FunctionComponent, ReactElement } from 'react';

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

		${columns?.xs &&
		`@media (min-width: 480px) {
      grid-template-columns: repeat(${columns.xs}, 1fr);
    }`}

		${columns?.sm &&
		`@media (min-width: 576px) {
      grid-template-columns: repeat(${columns.sm}, 1fr);
      gap: ${typeof columnGap === 'object' ? columnGap?.sm : columnGap}px ${typeof rowGap === 'object' ? rowGap?.sm : rowGap}px;
    }`}

    ${columns?.md &&
		`@media (min-width: 768px) {
      grid-template-columns: repeat(${columns.md}, 1fr);
      gap: ${typeof columnGap === 'object' ? columnGap?.md : columnGap}px ${typeof rowGap === 'object' ? rowGap?.md : rowGap}px;
    }`}

    ${columns?.lg &&
		`@media (min-width: 992px) {
      grid-template-columns: repeat(${columns.lg}, 1fr);
      gap: ${typeof columnGap === 'object' ? columnGap?.lg : columnGap}px ${typeof rowGap === 'object' ? rowGap?.lg : rowGap}px;
    }`}

    ${columns?.xl &&
		`@media (min-width: 1200px) {
      grid-template-columns: repeat(${columns.xl}, 1fr);
      gap: ${typeof columnGap === 'object' ? columnGap?.xl : columnGap}px ${typeof rowGap === 'object' ? rowGap?.xl : rowGap}px;
    }`}
	`;
};

const emptyMessageStyle = css`
	text-align: center;
	font-size: 1.2rem;
	color: gray;
`;

export const AppGrid = <T extends { id: string }>({
	items,
	renderItem: Component,
	columns = { base: 1, xs: 2, md: 3, lg: 4 },
	columnGap = 8,
	rowGap = { base: 2, lg: 4 },
	className,
	...otherProps
}: Props<T>): ReactElement => {
	const gridStyles = generateGridStyles(columns, columnGap, rowGap);

	if (!items.length) {
		return <div className={emptyMessageStyle}>No items available</div>;
	}

	return (
		<ul className={cx(gridStyles, className)} {...otherProps}>
			{items.map((item, index) => {
				const id = item.id || `${index}-${new Date().getTime()}`;
				return <Component key={id} {...item} />;
			})}
		</ul>
	);
};
