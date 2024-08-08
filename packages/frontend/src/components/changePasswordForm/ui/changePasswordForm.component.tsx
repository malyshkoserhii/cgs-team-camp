import { ReactElement } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { requestPasswordChangeSchemaResolver } from '~shared/joiSchemas/joiSchemas/user/requestPasswordChange.schema';
import { resetPasswordSchemaResolver } from '~shared/joiSchemas/joiSchemas/user/resetPassword.schema';
import { Form } from '~shared/ui/form';
import { useUserStore } from '~store/user.store';
import { optionsConfirm, optionsReset } from '../model/formOptions';
import { formContainerStyle } from './changePasswordForm.styles';

type Props = {
	firstStep?: boolean;
};

type FirstStepValues = {
	email: string;
};

type SecondStepValues = {
	password: string;
	confirmPassword: string;
};

export const ChangePasswordForm = ({ firstStep }: Props): ReactElement => {
	const [searchParams] = useSearchParams();
	const { requestPasswordReset, resetPassword, resetIsLoading } =
		useUserStore();
	const navigate = useNavigate();
	const token = searchParams.get('token');

	const onSubmit = async (
		data: FirstStepValues | SecondStepValues,
	): Promise<void> => {
		if (firstStep) {
			const { email } = data as FirstStepValues;
			await requestPasswordReset(email);
		} else {
			const { password } = data as SecondStepValues;
			if (token) {
				await resetPassword(token, password, navigate);
			}
		}
	};

	return (
		<div className={formContainerStyle}>
			<Form<FirstStepValues | SecondStepValues>
				variant="noStyle"
				heading={
					firstStep
						? 'Write your email to change the password.'
						: 'Create new password'
				}
				options={firstStep ? optionsReset : optionsConfirm}
				defaultValues={
					firstStep
						? { email: '' }
						: { password: '', confirmPassword: '' }
				}
				formValidationSchema={
					firstStep
						? requestPasswordChangeSchemaResolver
						: resetPasswordSchemaResolver
				}
				onSubmit={onSubmit}
				isLoading={resetIsLoading}
			/>
		</div>
	);
};
