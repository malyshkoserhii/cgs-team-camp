import React, { FC, useId } from 'react';

import classNames from 'classnames';
import { Field } from 'react-final-form';
import { ErrorStlyes } from '../form/form.styles';
import {
	ErrorSpanStyle,
	UtilInputStyles,
	UtilLabelStyles,
} from './input.styles';

export type InputProps = {
	name: string;

	placeholder: string;
	title: string;
	additionalStyles?: string;
	submitFailed?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = ({
	name,
	placeholder = '',
	title,
	additionalStyles,
	type = 'text',
	id,
	...rest
}) => {
	const defaultId = useId();
	const inputId = id ?? defaultId;
	return (
		<Field
			name={name}
			render={({ input, meta }) => (
				<div className={additionalStyles}>
					{title && (
						<label
							htmlFor={inputId}
							className={classNames(UtilLabelStyles)}
						>
							{title}
						</label>
					)}
					<input
						type={type}
						id={inputId}
						className={classNames(
							UtilInputStyles,
							meta.error && meta.submitFailed && ErrorStlyes,
						)}
						placeholder={placeholder}
						{...input}
						{...rest}
					/>
					{meta.submitFailed && meta.error && (
						<span className={classNames(ErrorSpanStyle)}>
							{meta.error}
						</span>
					)}
				</div>
			)}
		/>
	);
};
