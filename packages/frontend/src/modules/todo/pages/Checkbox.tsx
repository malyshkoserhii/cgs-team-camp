import React from 'react';
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import {
	inputContainerStyles,
	labelStyles,
	checkboxStyles,
} from './TodoPage.styles';

interface CheckboxProps<T extends FieldValues> {
	id: Path<T>;
	label: string;
	register: UseFormRegister<T>;
}

const Checkbox = <T extends FieldValues>({
	id,
	label,
	register,
}: CheckboxProps<T>): JSX.Element => (
	<div className={inputContainerStyles}>
		<label htmlFor={id} className={labelStyles}>
			{label}
			<input
				id={id}
				type="checkbox"
				{...register(id)}
				className={checkboxStyles}
			/>
		</label>
	</div>
);

export default Checkbox;
