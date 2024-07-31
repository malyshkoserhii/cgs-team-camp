import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { headerStyle } from './heading.styles';

const HEADER_SIZES = {
	small: '1.25rem',
	medium: '1.5rem',
	large: '2rem',
	xlarge: '2.5rem',
	xxlarge: '3rem',
};

type HeaderSize = keyof typeof HEADER_SIZES;
type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeaderProps {
	size: HeaderSize;
	level?: HeaderLevel;
	children: React.ReactNode;
	className?: string;
}

export const Heading = ({
	size,
	level = 1,
	children,
	className,
}: HeaderProps): ReactElement => {
	const fontSize = HEADER_SIZES[size] || HEADER_SIZES.medium;
	const Tag = `h${level}` as keyof JSX.IntrinsicElements;

	return (
		<Tag className={classNames(headerStyle(fontSize), className)}>
			{children}
		</Tag>
	);
};
