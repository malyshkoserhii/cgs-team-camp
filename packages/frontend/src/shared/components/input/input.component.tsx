import React, { FC } from 'react';

import classNames from 'classnames';
import { Field } from 'react-final-form';
import { ErrorStlyes } from '../form/form.styles';
import { UtilInputStyles, UtilLabelStyles } from './input.styles';

export type InputProps = {
	name: string;

	placeholder: string;
	title: string;
	additionalStyles?: string;
	submitFailed?: boolean;
};

export const Input: FC<InputProps> = ({
	name,
	placeholder = '',
	title,
	additionalStyles,
}) => {
	return (
		<Field
			name={name}
			render={({ input, meta }) => (
				<div className={additionalStyles}>
					{title && (
						<label className={classNames(UtilLabelStyles)}>
							{title}
						</label>
					)}
					<input
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
