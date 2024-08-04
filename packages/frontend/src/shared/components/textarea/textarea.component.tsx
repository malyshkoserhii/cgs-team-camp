import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { textareaStyles, textareaWrapperStyles } from './textarea.styles';
import { errorMessageStyle } from '~shared/styles/common-styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	errorMessage?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, defaultValue, errorMessage, ...props }, ref): React.ReactNode => {
		return (
			<div className={textareaWrapperStyles}>
				<label>{label}</label>
				<textarea
					ref={ref}
					className={textareaStyles}
					defaultValue={defaultValue}
					{...props}
				/>
				<p className={errorMessageStyle}>{errorMessage}</p>
			</div>
		);
	},
);

export default Textarea;
