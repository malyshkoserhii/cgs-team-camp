import { Switch } from '@blueprintjs/core';

import React, { FC } from 'react';
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
	return (
		<Switch
			large={true}
			checked={status}
			readOnly={readOnly}
			className={additionalStyles}
		/>
	);
};

export default CustomToggle;
