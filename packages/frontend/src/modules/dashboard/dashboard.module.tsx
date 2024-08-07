import { useEffect } from 'react';
import { useDashboardStore } from '~/store';
import DashboardForm from '../../shared/components/dashboard/dashboard.form';
import DashboardList from '../../shared/components/dashboard/dashboard.container';
const DashboardPage: React.FC = () => {
	const { dashboards, fetchDashboards } = useDashboardStore();

	useEffect(() => {
		fetchDashboards();
	}, [fetchDashboards]);

	return (
		<div>
			<h1>Dashboards</h1>
			<DashboardForm />
			<DashboardList dashboards={dashboards} />
		</div>
	);
};

export default DashboardPage;
