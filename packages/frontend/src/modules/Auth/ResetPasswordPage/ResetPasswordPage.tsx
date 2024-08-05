import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { UtilForm } from '~shared/components/form/form';
import { Input } from '~shared/components/input/input.component';
import { ResetPasswordInitState } from '~shared/constants/form-initial-values/user-form-init-values';
import { resetPasswordSchema } from '~shared/schemas/user.schema';
import { resetPasswordType } from '~shared/types/user.types';
import { useAuthStore } from '~store/auth.store';

const ResetPasswordPage: React.FC = () => {
	const { resetPassword } = useAuthStore();

	const [searchParams] = useSearchParams();
	const resetToken = searchParams.get('resetToken');

	const handleSubmit = async (pass: resetPasswordType): Promise<void> => {
		await resetPassword(pass.newPassword, resetToken);
	};

	return (
		<div>
			<UtilForm
				onSubmit={handleSubmit}
				initialValues={ResetPasswordInitState}
				schema={resetPasswordSchema}
				submitButtonText="Change Password"
			>
				<Input
					name="newPassword"
					placeholder="password"
					title="New Password"
				/>
			</UtilForm>
		</div>
	);
};

export default ResetPasswordPage;
