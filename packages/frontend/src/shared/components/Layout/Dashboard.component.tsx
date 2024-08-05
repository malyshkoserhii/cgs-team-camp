import React from 'react';
import NavBar from '../navBar/navBar.component';
import { menuConfig } from '../navBar/menu.config';

interface IDashboardLayout {
	children: React.ReactNode;
}

const DashboardLayout = ({
	children,
}: IDashboardLayout): React.ReactElement => {
	return (
		<div>
			<div>
				<h2>User menu</h2>
				<NavBar config={menuConfig} />
			</div>

			<div>{children}</div>
		</div>
	);
};

export default DashboardLayout;
