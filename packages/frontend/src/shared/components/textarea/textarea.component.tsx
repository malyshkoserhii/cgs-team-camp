import React, { FC, useId } from 'react';

import classNames from 'classnames';
import { Field } from 'react-final-form';
import { ErrorStlyes } from '../form/form.styles';
import { InputProps } from '../input/input.component';
import { UtilInputStyles, UtilLabelStyles } from '../input/input.styles';

export const Textarea: FC<InputProps> = ({
	name,
	placeholder = '',
	title,
	additionalStyles,
}) => {
	const id = useId();
	return (
		<Field
			name={name}
			render={({ input, meta }) => (
				<div className={additionalStyles}>
					{title && (
						<label className={UtilLabelStyles} htmlFor={id}>
							{title}
						</label>
					)}
					<textarea
						id={id}
						className={classNames(
							UtilInputStyles,
							meta.error && meta.submitFailed && ErrorStlyes,
						)}
						placeholder={placeholder}
						{...input}
					/>
					{meta.submitFailed && meta.error && (
						<span>{meta.error}</span>
					)}
				</div>
			)}
		/>
	);
};
