import React from 'react';
import { userInfo, userInfoBox } from './userMenu.styles';
import { Button } from '@blueprintjs/core';
import { useAuthStore } from '~store/auth.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';

const UserMenu = (): React.ReactNode => {
	const { user } = useAuthStore();
	const navigate = useNavigate();
	return (
		<div className={userInfoBox}>
			<p className={userInfo}>{user?.username}</p>
			<p className={userInfo}>{user?.email}</p>
			<Button onClick={() => navigate(ROUTER_KEYS.USER_PROFILE)}>
				User Profile
			</Button>
		</div>
	);
};

export default UserMenu;
