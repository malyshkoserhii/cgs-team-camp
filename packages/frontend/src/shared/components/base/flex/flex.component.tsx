import classNames from 'classnames';
import { ReactElement } from 'react';
import {
	alignStyle,
	baseStyle,
	directionStyle,
	gapStyle,
	justifyStyle,
	wrapStyle,
} from './flex.styles';

type FlexProps = {
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
	children: React.ReactNode;
	className?: string;
};

export const Flex = ({
	direction = 'row',
	align = 'center',
	justify = 'center',
	wrap = 'nowrap',
	gap = '0',
	children,
	className,
}: FlexProps): ReactElement => {
	return (
		<div
			className={classNames(
				baseStyle,
				directionStyle(direction),
				alignStyle(align),
				justifyStyle(justify),
				wrapStyle(wrap),
				gapStyle(gap),
				className,
			)}
		>
			{children}
		</div>
	);
};
