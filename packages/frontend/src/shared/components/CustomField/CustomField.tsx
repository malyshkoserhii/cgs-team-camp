import { Field } from 'formik';
import React from 'react';
import {
	filedGroupWrapper,
	inputStyle,
} from '~shared/components/CustomField/CustomField.styles';

interface CustomFieldProps {
	id: string;
	label: string;
	name: string;
	type?: string;
	as?: string;
	err: string;
}

export const CustomField: React.FC<CustomFieldProps> = ({
	id,
	label,
	name,
	type = 'text',
	as = 'input',
}) => {
	return (
		<div className={filedGroupWrapper}>
			<label htmlFor={id}>{label}</label>
			<Field
				id={id}
				name={name}
				type={type}
				as={as}
				className={inputStyle}
			/>
		</div>
	);
};
