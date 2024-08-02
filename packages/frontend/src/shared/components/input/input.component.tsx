import React, { InputHTMLAttributes } from 'react';

interface Input extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const Input = ({ label, defaultValue, ...props }: Input): React.ReactNode => {
	return (
		<div>
			<label style={{ display: 'flex', gap: 20 }}>
				{label}
				<input defaultValue={defaultValue} {...props} />
			</label>
		</div>
	);
};

export default Input;
