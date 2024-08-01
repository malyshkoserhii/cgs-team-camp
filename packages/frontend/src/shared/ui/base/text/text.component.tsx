import { css, cx } from '@emotion/css';
import React, { ReactElement } from 'react';
import { alignStyles, textStyle } from './text.styles';

const TEXT_SIZES = {
	small: '0.875rem',
	medium: '1rem',
	large: '1.25rem',
};

type TextSize = keyof typeof TEXT_SIZES;

interface TextProps {
	size?: TextSize;
	children: React.ReactNode;
	className?: string;
	bold?: boolean;
	align?: 'left' | 'center' | 'right';
}

export const Text = ({
	size = 'medium',
	children,
	className,
	bold = false,
	align = 'left',
}: TextProps): ReactElement => {
	const fontSize = TEXT_SIZES[size] || TEXT_SIZES.medium;
	const alignClass = align ? alignStyles[align] : '';

	return (
		<p
			className={cx(textStyle(fontSize), alignClass, className, {
				[css`
					font-weight: bold;
				`]: bold,
			})}
		>
			{children}
		</p>
	);
};
