import React, { FC } from 'react';

import { Field } from 'react-final-form';
import { InputProps } from '../input/input.component';
import { UtilLabelStyles } from '../input/input.styles';

export const Textarea: FC<InputProps> = ({
	name,
	placeholder = '',
	title,
	additionalStyles,
	submitFailed = false,
}) => {
	return (
		<Field
			name={name}
			render={({ input, meta }) => (
				<div className={additionalStyles}>
					{title && (
						<label className={UtilLabelStyles}>{title}</label>
					)}
					<textarea placeholder={placeholder} {...input} />
					{submitFailed && meta.error && <span>{meta.error}</span>}
				</div>
			)}
		/>
	);
};
