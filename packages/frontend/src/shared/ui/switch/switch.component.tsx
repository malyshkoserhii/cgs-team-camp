import { Switch as BlueprintSwitch, SwitchProps } from '@blueprintjs/core';
import React, { ReactElement } from 'react';
import { switchStyles } from './switch.styles';

type Props = SwitchProps & {
	checked?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Switch = ({
	checked = false,
	onChange,
	...otherProps
}: Props): ReactElement => {
	return (
		<BlueprintSwitch
			className={switchStyles}
			checked={checked}
			onChange={onChange}
			large
			{...otherProps}
		/>
	);
};
