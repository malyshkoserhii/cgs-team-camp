import { Button } from '@blueprintjs/core';
import { ReactElement, useEffect } from 'react';
import { DefaultValues, FieldValues, Resolver, useForm } from 'react-hook-form';
import { renderFormBlock } from '../model/renderFormBlock.service';
import { FormOption, FormVariantsEnum } from '../types/form.type';
import { FormHeader } from './FormHeader';

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
}: Props<T>): ReactElement => {
	const { handleSubmit, reset, control, getValues, trigger, watch } =
		useForm<T>({
			resolver: formValidationSchema,
			defaultValues: defaultValues as DefaultValues<T>,
			values,
		});

	const handleFormSubmit = handleSubmit(() => {
		const formData = getValues();

		console.log(formData);
		const transformedData = transformData
			? transformData(formData)
			: formData;
		if (onSubmit) {
			onSubmit(transformedData as T);
		}
	});

	const handleCancel = (): void => {
		if (onCancel) {
			onCancel();
		}
		reset();
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

	return (
		<div>
			{heading && <FormHeader heading={heading} />}
			<form onSubmit={handleFormSubmit}>
				<div>
					{options.map((option) =>
						renderFormBlock({ option, control }),
					)}
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
				</div>
			</form>
		</div>
	);
};
