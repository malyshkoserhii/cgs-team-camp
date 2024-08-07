import { Switch } from '@blueprintjs/core';

import React, { FC, useId } from 'react';
export type CustomToggleType = {
	status: boolean;
	readOnly?: boolean;
	additionalStyles?: string;
};

const CustomToggle: FC<CustomToggleType> = ({
	status,

	readOnly = true,
	additionalStyles,
}) => {
	const id = useId();
	return (
		<Switch
			id={id}
			large={true}
			checked={status}
			readOnly={readOnly}
			className={additionalStyles}
		/>
	);
};

export default CustomToggle;
