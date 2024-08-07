import React, { FC, useId } from 'react';

import { Field } from 'react-final-form';
import { UtilLabelStyles } from '../input/input.styles';

type SelectProps = {
	name: string;

	title: string;
	additionalStyles?: string;

	parse?: (value: string) => boolean;
	children: JSX.Element | JSX.Element[];
};

export const Select: FC<SelectProps> = ({
	name,

	title,
	additionalStyles,

	children,
	parse,
}) => {
	const id = useId();
	return (
		<Field
			name={name}
			parse={parse}
			render={({ input, meta }) => (
				<div className={additionalStyles}>
					{title && (
						<label className={UtilLabelStyles} htmlFor={id}>
							{title}
						</label>
					)}
					<select {...input} id={id}>
						{children}
					</select>
					{meta.submitFailed && meta.error && (
						<span>{meta.error}</span>
					)}
				</div>
			)}
		/>
	);
};
