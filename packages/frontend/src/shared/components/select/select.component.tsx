import React, { FC } from 'react';

import { Field } from 'react-final-form';
import { UtilLabelStyles } from '../input/input.styles';

type SelectProps = {
	name: string;

	title: string;
	additionalStyles?: string;
	submitFailed: boolean;
	parse?: (value: string) => boolean;
	children: JSX.Element | JSX.Element[];
};

export const Select: FC<SelectProps> = ({
	name,

	title,
	additionalStyles,
	submitFailed = false,
	children,
	parse,
}) => {
	return (
		<Field
			name={name}
			parse={parse}
			render={({ input, meta }) => (
				<div className={additionalStyles}>
					{title && (
						<label className={UtilLabelStyles}>{title}</label>
					)}
					<select {...input}>{children}</select>
					{submitFailed && meta.error && <span>{meta.error}</span>}
				</div>
			)}
		/>
	);
};
