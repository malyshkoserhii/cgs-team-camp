import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useAuthStore } from '~store/auth.store';
import {
	useGetUserProfile,
	useUpdateUser,
	useChangePassword,
} from '~/api/hooks/useUser';
import UpdateNameForm from '~/shared/forms/user/update-user-name/update-name.form';
import ChangePasswordForm from '~/shared/forms/user/change-password/change-password.form';
import { showToast } from '~/utils/showToast';
import Loader from '~shared/components/loader/loader.component';
import { ROUTER_KEYS } from '~shared/keys';

import { profileWrapper } from './profile.styles';

const Profile: React.FC = () => {
	const { userId } = useAuthStore();
	const { data: user, isLoading } = useGetUserProfile(userId);
	const { mutateAsync: updateUser } = useUpdateUser();
	const { mutateAsync: changePassword } = useChangePassword();

	const handleUpdateName = useCallback(
		async (name: string) => {
			await updateUser({ ...user, name });
			showToast('Name updated successfully');
		},
		[updateUser],
	);

	const handleChangePassword = useCallback(
		async (oldPassword: string, newPassword: string) => {
			await changePassword({
				oldPassword,
				newPassword,
			});
			showToast('Password changed successfully');
		},
		[changePassword],
	);

	if (isLoading) return <Loader />;
	if (!user) return <div>User not found</div>;

	return (
		<div className={profileWrapper}>
			<Link to={ROUTER_KEYS.DASHBOARD}>Go to todos</Link>
			{user ? (
				<>
					<h1>Profile</h1>

					<h2>Update Name</h2>
					<UpdateNameForm
						initialName={user.name || ''}
						onSubmit={handleUpdateName}
					/>

					<h2>Change Password</h2>
					<ChangePasswordForm onSubmit={handleChangePassword} />
				</>
			) : (
				<div>User not found</div>
			)}
		</div>
	);
};

export default Profile;
