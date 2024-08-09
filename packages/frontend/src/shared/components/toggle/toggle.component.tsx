import { Checkbox, Switch } from '@blueprintjs/core';
import classNames from 'classnames';
import React, { FC, useId } from 'react';
import { Field } from 'react-final-form';
import { ErrorSpanStyle, UtilLabelStyles } from '../input/input.styles';

export type CustomToggleProps = {
	name: string;
	title: string;
	additionalStyles?: string;
	submitFailed?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CustomToggle: FC<CustomToggleProps> = ({
	name,

	additionalStyles,
	id,
	...rest
}) => {
	const defaultId = useId();
	const inputId = id ?? defaultId;

	return (
		<Field
			name={name}
			type="checkbox"
			render={({ input, meta }) => {
				const labelText = input.checked ? 'Done' : 'In Progress';

				return (
					<div className={classNames(additionalStyles)}>
						<Checkbox
							id={inputId}
							{...input}
							{...rest}
							large
							inline
							labelElement={
								<label
									htmlFor={inputId}
									className={classNames(UtilLabelStyles)}
								>
									{labelText}
								</label>
							}
						/>
						{meta.submitFailed && meta.error && (
							<span className={classNames(ErrorSpanStyle)}>
								{meta.error}
							</span>
						)}
					</div>
				);
			}}
		/>
	);
};

export type DecorativeToggleType = {
	status: boolean;
	readOnly?: boolean;
	additionalStyles?: string;
};

const DecorativeToggle: FC<DecorativeToggleType> = ({
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

export default DecorativeToggle;
