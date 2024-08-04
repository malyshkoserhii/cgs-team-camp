import { Divider } from '@blueprintjs/core';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { optionsConfirm } from '~/components/changePasswordForm/model/formOptions';
import { ROUTER_KEYS } from '~shared/const/keys.const';
import { useAuth } from '~shared/hooks/useAuth.hook';
import { resetPasswordSchemaResolver } from '~shared/joiSchemas/joiSchemas/user/resetPassword.schema';
import { updateUserNameSchemaResolver } from '~shared/joiSchemas/joiSchemas/user/updateUser.schema';
import { Form } from '~shared/ui/form';
import { formContainerStyle } from '~shared/ui/form/ui/Form.styles';
import { useUserStore } from '~store/user.store';
import { optionsName } from '../model/formOptions';
import { dividerStyle } from './updateUserForm.styles';

export const UpdateUserForm = (): ReactElement => {
	const { updateUser, currentLoading, error } = useUserStore();
	const { user } = useAuth();
	const navigate = useNavigate();

	const onSubmitUsername = async (data: { name: string }): Promise<void> => {
		updateUser(data, navigate);
		if (!error) {
			navigate(ROUTER_KEYS.DASHBOARD);
		}
	};

	const onSubmitPassword = async (data: {
		password: string;
		confirmPassword: string;
	}): Promise<void> => {
		updateUser({ password: data.password }, navigate);
	};

	return (
		<div className={formContainerStyle}>
			<Form
				variant="noStyle"
				heading="Your profile"
				options={optionsName}
				defaultValues={{
					name: user.name,
				}}
				formValidationSchema={updateUserNameSchemaResolver}
				onSubmit={onSubmitUsername}
				isLoading={currentLoading}
				buttonLabel="Change username"
			/>
			<Divider className={dividerStyle} />
			<Form
				variant="noStyle"
				options={optionsConfirm}
				defaultValues={{
					password: '',
					confirmPassword: '',
				}}
				formValidationSchema={resetPasswordSchemaResolver}
				onSubmit={onSubmitPassword}
				buttonLabel="Change password"
				isLoading={currentLoading}
			/>
		</div>
	);
};
