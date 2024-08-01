import { PrismaClient } from '@prisma/client';
import {
	DashboardCreateType,
	DashboardUpdateType,
	DashboardFindingType,
	DashboardType,
} from '@/types/dashboard.type';

const prisma = new PrismaClient();

export class DashboardService {
	async find(
		queryParams?: DashboardFindingType,
	): Promise<Array<DashboardType>> {
		try {
			const whereConditions: {
				ownername?: { contains: string; mode: 'insensitive' };
				name?: { contains: string; mode: 'insensitive' };
			} = {};

			if (queryParams) {
				const { findField } = queryParams;

				if (findField) {
					whereConditions.ownername = {
						contains: findField,
						mode: 'insensitive',
					};
					whereConditions.name = {
						contains: findField,
						mode: 'insensitive',
					};
				}

				const dashboards = await prisma.dashboard.findMany({
					where: whereConditions,
				});

				if (dashboards.length > 0) {
					return dashboards;
				} else {
					whereConditions.ownername = undefined;
					whereConditions.name = {
						contains: findField,
						mode: 'insensitive',
					};

					const searchingNameDashboards =
						await prisma.dashboard.findMany({
							where: whereConditions,
						});
					if (searchingNameDashboards.length > 0) {
						return searchingNameDashboards;
					} else {
						whereConditions.ownername = {
							contains: findField,
							mode: 'insensitive',
						};
						whereConditions.name = undefined;

						return await prisma.dashboard.findMany({
							where: whereConditions,
						});
					}
				}
			}
			return [];
		} catch (err) {
			console.error('Error fetching dashboards:', err);
			throw new Error('Failed to retrieve dashboards');
		}
	}

	async create(data: DashboardCreateType): Promise<DashboardType> {
		try {
			const newDashboard = await prisma.dashboard.create({
				data: {
					name: data.name,
					descr: data.descr || null,
					date: data.date || new Date(),
					private: Boolean(data.private),
					ownername: data.ownername,
				},
			});
			return {
				id: newDashboard.id,
				name: newDashboard.name,
				descr: newDashboard.descr,
				date: newDashboard.date,
				private: newDashboard.private,
				ownername: newDashboard.ownername,
			};
		} catch (err) {
			console.error('Error creating dashboard:', err);
			throw new Error('Failed to create dashboard');
		}
	}

	async update(data: DashboardUpdateType): Promise<DashboardType> {
		try {
			const existingDashboard = await prisma.dashboard.findUnique({
				where: { id: data.id },
			});

			if (!existingDashboard) {
				throw new Error('Dashboard not found');
			}

			const updatedDashboard = await prisma.dashboard.update({
				where: { id: data.id },
				data: {
					...data,
					descr: data.descr ?? existingDashboard.descr,
					date: data.date ?? existingDashboard.date,
					private: data.private ?? existingDashboard.private,
				},
			});

			return {
				id: updatedDashboard.id,
				name: updatedDashboard.name,
				descr: updatedDashboard.descr,
				date: updatedDashboard.date,
				private: updatedDashboard.private,
				ownername: updatedDashboard.ownername,
			};
		} catch (err) {
			console.error('Error updating dashboard:', err);
			throw new Error('Failed to update dashboard');
		}
	}

	async delete(id: number): Promise<DashboardType> {
		try {
			const existingDashboard = await prisma.dashboard.findUnique({
				where: { id },
			});

			if (!existingDashboard) {
				throw new Error('Dashboard not found');
			}

			const deletedDashboard = await prisma.dashboard.delete({
				where: { id },
			});

			return {
				id: deletedDashboard.id,
				name: deletedDashboard.name,
				descr: deletedDashboard.descr,
				date: deletedDashboard.date,
				private: deletedDashboard.private,
				ownername: deletedDashboard.ownername,
			};
		} catch (err) {
			console.error('Error deleting dashboard:', err);
			throw new Error('Failed to delete dashboard');
		}
	}
}
