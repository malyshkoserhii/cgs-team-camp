import {
	Button as BlueprintjsButton,
	ButtonProps,
	Tooltip,
} from '@blueprintjs/core';
import { cx } from '@emotion/css';
import * as React from 'react';
import {
	buttonStyle,
	clearButtonStyle,
	fullWidthStyle,
	iconStyle,
	outlineButtonStyle,
} from './button.styles';

interface CustomButtonProps extends ButtonProps {
	variant?: 'filled' | 'outline' | 'clear';
	fullWidth?: boolean;
	toolTipMessage?: string;
}

const Button = ({
	variant = 'filled',
	fullWidth = true,
	toolTipMessage,
	...props
}: CustomButtonProps): React.ReactElement => {
	const button = (
		<BlueprintjsButton
			large
			className={cx(
				buttonStyle,
				iconStyle,
				{
					[outlineButtonStyle]: variant === 'outline',
					[clearButtonStyle]: variant === 'clear',
					[fullWidthStyle(props.icon || props.rightIcon)]: fullWidth,
				},
				props.className,
			)}
			{...props}
		/>
	);

	if (toolTipMessage) {
		return (
			<Tooltip content={<span>{toolTipMessage}</span>} minimal={true}>
				{button}
			</Tooltip>
		);
	}

	return button;
};

export default Button;
