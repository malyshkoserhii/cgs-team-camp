import React, { TextareaHTMLAttributes } from 'react';

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
}

const Textarea = ({
	label,
	defaultValue,
	...props
}: ITextarea): React.ReactNode => {
	return (
		<div>
			<label>
				{label}
				<textarea defaultValue={defaultValue} {...props} />
			</label>
		</div>
	);
};

export default Textarea;
