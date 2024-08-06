import React from 'react';
import { Field } from 'formik';
import { labelWrapper } from '~shared/components/CustomCheckbox/CustomCheckbox.styles';

interface CustomCheckboxProps {
	id: string;
	type: string;
	name: string;
	label: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
	id,
	type = 'checkbox',
	name,
	label,
}) => {
	return (
		<div className={labelWrapper}>
			<Field type={type} name={name} />
			<label htmlFor={id}>{label}</label>
		</div>
	);
};
