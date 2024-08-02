import { ReactElement, ReactNode, useEffect } from 'react';
import { DefaultValues, FieldValues, Resolver, useForm } from 'react-hook-form';
import Button from '~shared/ui/button/button.component';
import { renderFormBlock } from '../model/renderFormBlock.service';
import { FormOption, FormVariantsEnum } from '../types/form.type';
import { formContainerStyle, noStyleContainer } from './Form.styles';
import { FormHeader } from './FormHeader';

export type FormVariant = 'default' | 'noStyle';

type Props<T> = {
	heading?: string;
	options: FormOption<FormVariantsEnum>[];
	formValidationSchema?: Resolver<T>;
	defaultValues?: T;
	values?: T;
	onSubmit?: (data: T) => void;
	onChange?: (data: T) => void;
	transformData?: (data: T) => void;
	isLoading?: boolean;
	disabled?: boolean;
	buttonLabel?: string;
	withCancel?: boolean;
	initialTrigger?: boolean;
	onCancel?: () => void;
	ButtonComponent?: typeof Button;
	variant?: FormVariant;
	content?: ReactNode;
};

export const Form = <T extends FieldValues>({
	heading,
	options,
	onChange,
	formValidationSchema,
	onSubmit,
	transformData,
	defaultValues,
	isLoading,
	disabled,
	initialTrigger,
	buttonLabel = 'Submit',
	onCancel,
	ButtonComponent,
	values,
	variant = 'default',
	content,
}: Props<T>): ReactElement => {
	const { handleSubmit, reset, control, getValues, trigger, watch } =
		useForm<T>({
			resolver: formValidationSchema,
			defaultValues: defaultValues as DefaultValues<T>,
			values,
		});

	const handleFormSubmit = handleSubmit(() => {
		const formData = getValues();
		const transformedData = transformData
			? transformData(formData)
			: formData;
		if (onSubmit) {
			onSubmit(transformedData as T);
		}

		reset(defaultValues);
	});

	const handleCancel = (): void => {
		if (onCancel) {
			onCancel();
		}
		reset(defaultValues);
	};

	useEffect(() => {
		if (initialTrigger) {
			trigger();
		}
	}, [initialTrigger, trigger, options]);

	useEffect(() => {
		if (onChange) {
			const subscription = watch(() => {
				return handleSubmit(onChange)();
			});
			return () => subscription.unsubscribe();
		}
	}, [handleSubmit, onChange, onSubmit, watch]);

	const containerStyle =
		variant === 'noStyle' ? noStyleContainer : formContainerStyle;

	return (
		<div className={containerStyle}>
			{heading && <FormHeader heading={heading} />}
			<form onSubmit={handleFormSubmit}>
				{options.map((option) => renderFormBlock({ option, control }))}
				{content}
				{onSubmit && (
					<div>
						{ButtonComponent ? (
							<ButtonComponent
								disabled={disabled}
								type="submit"
								loading={isLoading}
							/>
						) : (
							<Button
								disabled={disabled}
								type="submit"
								loading={isLoading}
							>
								{buttonLabel}
							</Button>
						)}
						{onCancel && (
							<Button onClick={handleCancel}>Cancel</Button>
						)}
					</div>
				)}
			</form>
		</div>
	);
};
