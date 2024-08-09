import React from 'react';
import NavBar from '../navBar/navBar.component';
import { menuConfig, publicMenuConfig } from '../navBar/menu.config';
import { useAuthStore } from '~store/auth.store';
import UserMenu from '../user/userMenu.component';
import { menuWrapper } from './Dashboard.styles';
import { STORAGE_KEYS } from '~shared/keys';

interface IDashboardLayout {
	children: React.ReactNode;
}

const DashboardLayout = ({
	children,
}: IDashboardLayout): React.ReactElement => {
	const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
	const { user } = useAuthStore();

	return (
		<div>
			<div className={menuWrapper}>
				<NavBar config={token ? menuConfig : publicMenuConfig} />

				{user && <UserMenu />}
			</div>

			<div>{children}</div>
		</div>
	);
};

export default DashboardLayout;
