import { Button as BlueprintjsButton, ButtonProps } from '@blueprintjs/core';
import * as React from 'react';
import { buttonStyle } from './button.styles';

const Button = (props: ButtonProps): React.ReactElement => {
	return <BlueprintjsButton large className={buttonStyle} {...props} />;
};

export default Button;
