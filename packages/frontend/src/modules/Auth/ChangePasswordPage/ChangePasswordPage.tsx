import React from 'react';
import { UtilForm } from '~shared/components/form/form';
import { Input } from '~shared/components/input/input.component';
import { ChangePasswordInitState } from '~shared/constants/form-initial-values/user-form-init-values';
import { ChangePasswordSchema } from '~shared/schemas/user.schema';
import { useAuthStore } from '~store/auth.store';

type ChangePasswordType = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
};
const ChangePassword: React.FC = () => {
	const { changePassword } = useAuthStore();

	const onSubmit = async (values: ChangePasswordType): Promise<void> => {
		const { oldPassword, newPassword } = values;
		await changePassword({ oldPassword, newPassword });
	};

	return (
		<>
			<UtilForm
				onSubmit={onSubmit}
				initialValues={ChangePasswordInitState}
				schema={ChangePasswordSchema}
				submitButtonText="Change Password"
			>
				<Input
					name="oldPassword"
					placeholder="Old Password"
					title="Old Password"
				/>

				<Input
					name="newPassword"
					placeholder="New password"
					title="New Password"
				/>
				<Input
					name="confirmPassword"
					placeholder="Confirm password"
					title="Confirm Password"
				/>
			</UtilForm>
		</>
	);
};

export default ChangePassword;
