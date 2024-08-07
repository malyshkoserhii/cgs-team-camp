import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDashboardStore } from '~/store';

const DashboardList: React.FC = () => {
	const { dashboards, fetchDashboards } = useDashboardStore((state) => ({
		dashboards: state.dashboards,
		fetchDashboards: state.fetchDashboards,
	}));

	useEffect(() => {
		fetchDashboards();
	}, [fetchDashboards]);

	return (
		<div>
			<h1>Dashboards</h1>
			<ul>
				{dashboards.map((dashboard) => (
					<li key={dashboard.id}>
						<Link to={`/dashboard/${dashboard.id}`}>
							{dashboard.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DashboardList;
