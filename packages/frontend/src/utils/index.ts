import { CreateToastFnReturn } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { setIn } from 'final-form';
import { ObjectSchema, ValidationError } from 'yup';
import {
	showErrorToast,
	showErrorToastWithText,
} from '~shared/components/form.toasts';

export const validateFormValues =
	<T>(schema: ObjectSchema<T> | (() => ObjectSchema<T>)) =>
	async (values: T): Promise<Partial<Record<keyof T, string>>> => {
		if (typeof schema === 'function') {
			schema = schema();
		}
		try {
			await schema.validate(values, { abortEarly: false });
			return {};
		} catch (err) {
			if (err instanceof ValidationError) {
				const errors = err.inner.reduce(
					(
						formError: Partial<Record<keyof T, string>>,
						innerError: ValidationError,
					) => {
						return setIn(
							formError,
							innerError.path as keyof T as string,
							innerError.message,
						);
					},
					{},
				);
				return errors;
			}
			throw err;
		}
	};

export const tryCatch = async (
	fn: () => unknown,
	toast: CreateToastFnReturn,
): Promise<void> => {
	try {
		await fn();
	} catch (error) {
		if (error instanceof AxiosError)
			showErrorToastWithText(toast, error.response?.data.error);
		else showErrorToast(toast);
	}
};
