import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '~router/routes';

interface IDashboardLayout {
	children: React.ReactNode;
}

const DashboardLayout = ({
	children,
}: IDashboardLayout): React.ReactElement => {
	return (
		<div style={{ display: 'flex', gap: 200 }}>
			<div>
				<h2>User menu</h2>
				<nav>
					{routes.map((rout) => (
						<Link key={rout.path} to={rout.path}>
							{rout.title}
						</Link>
					))}
				</nav>
			</div>

			<div>{children}</div>
		</div>
	);
};

export default DashboardLayout;
