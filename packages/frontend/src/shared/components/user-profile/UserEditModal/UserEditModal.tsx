import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~shared/components/button/button.component';
import { UtilForm } from '~shared/components/form/form';
import { Input } from '~shared/components/input/input.component';

import { ROUTER_KEYS } from '~shared/keys/router-keys';

import { EditUserInitState } from '~shared/constants/form-initial-values/user-form-init-values';
import { UpdateUserSchema } from '~shared/schemas/user.schema';
import { EditUserType } from '~shared/types/user.types';
import { useAuthStore } from '~store/auth.store';
import {
	UserEditModalButton,
	UserEditModalStyles,
} from './UserEditModal.style';
type UserEditModalProps = {
	onclose: () => void;
};
const UserEditModal = ({ onclose }: UserEditModalProps): JSX.Element => {
	const authStore = useAuthStore();
	const navigate = useNavigate();
	const onUpdateUser = async (data: EditUserType): Promise<void> => {
		await authStore.updateUser(data.username);
		authStore.getCurrentUser();
		onclose();
	};
	const onChangePasswordClick = (): void => {
		navigate(ROUTER_KEYS.CHANGE_PASSWORD);
		onclose();
	};

	return (
		<>
			<UtilForm
				onSubmit={onUpdateUser}
				submitButtonText="Update User"
				initialValues={EditUserInitState}
				schema={UpdateUserSchema}
				additionalStyles={UserEditModalStyles}
			>
				<Input
					name="username"
					placeholder="username"
					title="username"
				/>
			</UtilForm>
			<Button
				text="Change Password"
				onClick={onChangePasswordClick}
				extraButtonStyles={UserEditModalButton}
				type="button"
			/>
		</>
	);
};

export default UserEditModal;
