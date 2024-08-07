import { DashboardType } from '../../../typings/dashboard.type';
import { useDashboardStore } from '../../../store';

interface DashboardItemProps {
	dashboard: DashboardType;
}

const DashboardItem: React.FC<DashboardItemProps> = ({ dashboard }) => {
	const { removeDashboard } = useDashboardStore();

	const handleDelete = (): void => {
		removeDashboard(dashboard.id);
	};

	return (
		<div>
			<h3>{dashboard.name}</h3>
			<p>{dashboard.descr}</p>
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
};

export default DashboardItem;
