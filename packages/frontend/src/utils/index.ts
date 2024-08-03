/* eslint-disable @typescript-eslint/no-explicit-any */
import { setIn } from 'final-form';
import { ObjectSchema } from 'yup';

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
			const errors = err.inner.reduce(
				(
					formError: Partial<Record<keyof T, string>>,
					innerError: any,
				) => {
					return setIn(
						formError,
						innerError.path,
						innerError.message,
					);
				},
				{},
			);

			return errors;
		}
	};
