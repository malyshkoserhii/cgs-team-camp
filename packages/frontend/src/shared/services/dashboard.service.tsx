import {
	DashboardCreateType,
	DashboardType,
	DashboardUpdateType,
} from '~typings/dashboard.type';
import axios from 'axios';

export const fetchDashboards = async (): Promise<DashboardType[]> => {
	const response = await axios.get<DashboardType[]>(
		'http://localhost:3030/api/dashboard',
	);
	return response.data;
};

export const createDashboard = async (
	dashboard: DashboardCreateType,
): Promise<DashboardType> => {
	const response = await axios.post<DashboardType>(
		'http://localhost:3030/api/dashboard/create',
		dashboard,
	);
	return response.data;
};

export const updateDashboard = async (
	dashboard: DashboardUpdateType,
): Promise<DashboardType> => {
	const response = await axios.put(
		`http://localhost:3030/api/dashboard/update/${dashboard.id}`,
		dashboard,
	);
	return JSON.parse(response.data);
};

export const deleteDashboard = async (id: number): Promise<void> => {
	await axios.delete(`http://localhost:3030/api/dashboard/delete/${id}`, {
		method: 'DELETE',
	});
};
