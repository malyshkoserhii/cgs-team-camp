import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { UtilForm } from '~shared/components/form/form';
import { Input } from '~shared/components/input/input.component';
import { PageHeader } from '~shared/components/page-wrapper/page-wraper.styles.';
import PageWrapper from '~shared/components/page-wrapper/page-wrapper';
import { ResetPasswordInitState } from '~shared/constants/form-initial-values/user-form-init-values';
import { resetPasswordSchema } from '~shared/schemas/user.schema';
import { resetPasswordType } from '~shared/types/user.types';
import { useAuthStore } from '~store/auth.store';

const ResetPasswordPage: React.FC = () => {
	const { resetPassword, authError: error, loading } = useAuthStore();

	const [searchParams] = useSearchParams();
	const resetToken = searchParams.get('resetToken');

	const handleSubmit = async (pass: resetPasswordType): Promise<void> => {
		await resetPassword(pass.newPassword, resetToken);
	};

	return (
		<>
			<h2 className={PageHeader}>Reset Password Page</h2>
			<PageWrapper error={error} loading={loading}>
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
						type="password"
					/>
				</UtilForm>
			</PageWrapper>
		</>
	);
};

export default ResetPasswordPage;
