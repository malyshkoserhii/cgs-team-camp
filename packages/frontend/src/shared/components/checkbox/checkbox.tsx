import React, { FC, useId } from 'react';

import { Checkbox } from '@blueprintjs/core';
import classNames from 'classnames';
import { Field } from 'react-final-form';
import { ErrorSpanStyle, UtilLabelStyles } from '../input/input.styles';

export type CustomCheckBoxProps = {
	name: string;

	title: string;
	additionalStyles?: string;
	submitFailed?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CustomCheckBox: FC<CustomCheckBoxProps> = ({
	name,
	title,
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
			render={({ input, meta }) => (
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
								{title}
							</label>
						}
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
