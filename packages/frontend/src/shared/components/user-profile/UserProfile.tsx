import { Dialog, DialogBody } from '@blueprintjs/core';
import React, { useState } from 'react';
import { DialogContainer } from '~modules/Todos/TodoForm/Form.styles';
import Button from '~shared/components/button/button.component';

import { useAuthStore } from '~store/auth.store';
import UserEditModal from './UserEditModal/UserEditModal';
import { UserProfileContainer } from './UserEditModal/UserEditModal.style';

const UserProfile = (): JSX.Element => {
	const [openModal, setOpenaModal] = useState(false);
	const closeUpdateModal = (): void => {
		setOpenaModal(false);
	};
	const openUpdateModal = (): void => {
		setOpenaModal(true);
	};
	const authStore = useAuthStore();
	const user = authStore.user;

	const onLogOut = (): void => {
		authStore.logout();
	};
	return (
		<div className={UserProfileContainer}>
			{user && <p>hi {user.username}</p>}
			<Button text="Logout" onClick={onLogOut} />
			<Button text="Edit User" onClick={openUpdateModal} />
			<Dialog
				onClose={closeUpdateModal}
				isOpen={openModal}
				title="Edit Todo"
				className={DialogContainer}
				canEscapeKeyClose={false}
				canOutsideClickClose={false}
			>
				<DialogBody>
					{<UserEditModal onclose={closeUpdateModal} />}
				</DialogBody>
			</Dialog>
		</div>
	);
};

export default UserProfile;
