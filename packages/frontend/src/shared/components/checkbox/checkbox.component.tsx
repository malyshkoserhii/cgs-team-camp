import React from 'react';
import { labelStyles, checkboxStyles } from './checkbox.styles';
import { UseFormRegister } from 'react-hook-form/dist/types';
import { FormData } from '../form/form.component';

interface CheckBoxProps {
	name: keyof FormData;
	register: UseFormRegister<FormData>;
	label: string;
	checked: boolean;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
	name,
	register,
	label,
	checked,
}) => {
	return (
		<label className={labelStyles}>
			<input
				className={checkboxStyles}
				{...register(`${name}`)}
				type="checkbox"
				defaultChecked={checked}
			/>
			{label}
		</label>
	);
};
