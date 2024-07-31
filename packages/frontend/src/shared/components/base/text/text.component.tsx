import { css } from '@emotion/css';
import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { textStyle } from './text.styles';

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
	bold?: boolean; // Add bold prop
}

export const Text = ({
	size = 'medium',
	children,
	className,
	bold = false,
}: TextProps): ReactElement => {
	const fontSize = TEXT_SIZES[size] || TEXT_SIZES.medium;

	return (
		<p
			className={classNames(textStyle(fontSize), className, {
				[css`
					font-weight: bold;
				`]: bold,
			})}
		>
			{children}
		</p>
	);
};
