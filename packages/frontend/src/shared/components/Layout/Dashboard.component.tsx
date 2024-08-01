import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = (): React.ReactElement => {
	return (
		<div style={{ display: 'flex', gap: 200 }}>
			<div>
				{/* add some menu with buttons */}
				<h2>User menu</h2>
			</div>

			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;
