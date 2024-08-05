import React, { forwardRef, InputHTMLAttributes } from 'react';
import { inputWrapperStyles, textInputStyles } from './input.styles';
import { errorMessageStyle } from '~shared/styles/common-styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, defaultValue, errorMessage, ...props }, ref): React.ReactNode => {
		return (
			<div className={inputWrapperStyles}>
				<label>{label}</label>
				<input
					ref={ref}
					className={textInputStyles}
					defaultValue={defaultValue}
					{...props}
				/>
				<p className={errorMessageStyle}>{errorMessage}</p>
			</div>
		);
	},
);

export default Input;
