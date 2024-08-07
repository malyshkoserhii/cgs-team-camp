// src/shared/services/dashboard.service.ts

import {
	DashboardCreateType,
	DashboardType,
	DashboardUpdateType,
} from '~typings/dashboard.type';

export const fetchDashboards = async (): Promise<DashboardType[]> => {
	const response = await fetch('http://localhost:3030/api/dashboard');
	return response.json();
};

export const createDashboard = async (
	dashboard: DashboardCreateType,
): Promise<DashboardType> => {
	const response = await fetch('http://localhost:3030/api/dashboard/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(dashboard),
	});
	return response.json();
};

export const updateDashboard = async (
	dashboard: DashboardUpdateType,
): Promise<DashboardType> => {
	const response = await fetch(
		`http://localhost:3030/api/dashboard/update/${dashboard.id}`,
		{
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(dashboard),
		},
	);
	return response.json();
};

export const deleteDashboard = async (id: number): Promise<void> => {
	await fetch(`http://localhost:3030/api/dashboard/delete/${id}`, {
		method: 'DELETE',
	});
};
