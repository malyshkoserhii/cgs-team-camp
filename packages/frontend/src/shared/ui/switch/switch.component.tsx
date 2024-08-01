import { Switch as BlueprintSwitch, SwitchProps } from '@blueprintjs/core';
import React, { ReactElement } from 'react';

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
			checked={checked}
			onChange={onChange}
			large
			{...otherProps}
		/>
	);
};
