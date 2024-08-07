import DashboardForm from '../../shared/components/dashboard/dashboard.form';
import DashboardList from '../../shared/components/dashboard/dashboard.container';
const DashboardContainerWrapper: React.FC = () => {
	return (
		<div>
			<h1>Dashboards</h1>
			<DashboardForm />
			<DashboardList />
		</div>
	);
};

export default DashboardContainerWrapper;
