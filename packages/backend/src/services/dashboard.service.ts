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

				const searchingNameDashboards = await prisma.dashboard.findMany(
					{
						where: whereConditions,
					},
				);
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
		} else {
			return prisma.dashboard.findMany();
		}
	}

	async create(data: DashboardCreateType): Promise<DashboardType> {
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
	}

	async update(data: DashboardUpdateType): Promise<DashboardType> {
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
				date: existingDashboard.date,
				private:
					Boolean(data.private) ?? Boolean(existingDashboard.private),
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
	}

	async delete(id: number): Promise<DashboardType> {
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
	}
}
