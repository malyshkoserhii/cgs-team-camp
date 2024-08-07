import * as React from 'react';
import { DashboardType } from '../../../typings/dashboard.type';
import DashboardItem from './dashboard.item';

interface DashboardListProps {
	dashboards: DashboardType[];
}

const DashboardList: React.FC<DashboardListProps> = ({ dashboards }) => {
	return (
		<div>
			{dashboards.map((dashboard) => (
				<DashboardItem key={dashboard.id} dashboard={dashboard} />
			))}
		</div>
	);
};

export default DashboardList;
