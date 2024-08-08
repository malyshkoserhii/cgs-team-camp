import React from 'react';

import { useAuthStore } from '~store/auth.store';
import { Button } from '~shared/components';
import { container } from './Profile.styles';

export const Profile: React.FC = () => {
	const { logout, user } = useAuthStore();
	const handleSubmit = (): void => {
		logout();
	};

	return (
		<div className={container}>
			<h1>Profile</h1>
			<p>User name: {user.username}</p>
			<p>User email: {user.email}</p>

			<Button text={'Logout'} type={'submit'} onClick={handleSubmit} />
		</div>
	);
};
