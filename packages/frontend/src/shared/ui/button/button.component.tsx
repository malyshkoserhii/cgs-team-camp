import { Button as BlueprintjsButton, ButtonProps } from '@blueprintjs/core';
import { cx } from '@emotion/css';
import * as React from 'react';
import {
	buttonStyle,
	fullWidthStyle,
	iconStyle,
	outlineButtonStyle,
} from './button.styles';

interface CustomButtonProps extends ButtonProps {
	variant?: 'filled' | 'outline';
	fullWidth?: boolean;
}

const Button = ({
	variant = 'filled',
	fullWidth = true,
	...props
}: CustomButtonProps): React.ReactElement => {
	return (
		<BlueprintjsButton
			large
			className={cx(
				buttonStyle,
				iconStyle,
				{
					[outlineButtonStyle]: variant === 'outline',
					[fullWidthStyle(props.icon || props.rightIcon)]: fullWidth,
				},
				props.className,
			)}
			{...props}
		/>
	);
};

export default Button;
