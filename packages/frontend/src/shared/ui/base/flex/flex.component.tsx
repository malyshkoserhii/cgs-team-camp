import { cx } from '@emotion/css';
import { ComponentPropsWithRef, ElementType, ReactElement } from 'react';
import {
	alignStyle,
	baseStyle,
	directionStyle,
	gapStyle,
	justifyStyle,
	wrapStyle,
} from './flex.styles';

type FlexProps<T extends ElementType> = ComponentPropsWithRef<T> & {
	as?: T;
	direction?: 'row' | 'column';
	align?: 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch';
	justify?:
		| 'flex-start'
		| 'center'
		| 'flex-end'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';
	wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
	gap?: string;
};

export const Flex = <T extends ElementType = 'div'>({
	as: Component = 'div' as T,
	direction = 'row',
	align = 'center',
	justify = 'flex-start',
	wrap = 'nowrap',
	gap = '0',
	children,
	className,
	...restProps
}: FlexProps<T>): ReactElement => {
	return (
		<Component
			className={cx(
				baseStyle,
				directionStyle(direction),
				alignStyle(align),
				justifyStyle(justify),
				wrapStyle(wrap),
				gapStyle(gap),
				className,
			)}
			{...restProps}
		>
			{children}
		</Component>
	);
};
