import { DashboardService } from '@/services/dashboard.service';
import { Request, Response } from 'express';
import {
	DashboardCreateType,
	DashboardFindingType,
	DashboardUpdateType,
} from '@/types/dashboard.type';

export class DashboardController {
	constructor(private readonly DashboardService: DashboardService) {}

	async getDashboard(req: Request, res: Response): Promise<void> {
		const query = req.query as unknown as DashboardFindingType;
		const dashboard = await this.DashboardService.find(query);
		res.send(dashboard);
	}

	async createDashboard(req: Request, res: Response): Promise<void> {
		try {
			const dashboardData: DashboardCreateType = req.body;
			const newDashboard =
				await this.DashboardService.create(dashboardData);
			res.status(201).send(newDashboard);
		} catch (err) {
			console.error(err);
			res.status(500).send({ error: 'Failed to create dashboard' });
		}
	}

	async updateDashboard(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id, 10);
		const updateData: DashboardUpdateType = { id, ...req.body };

		try {
			const updatedDashboard =
				await this.DashboardService.update(updateData);
			res.send(updatedDashboard);
		} catch (err) {
			console.error(err);
			res.status(500).send({ error: 'Failed to update dashboard' });
		}
	}

	async deleteDashboard(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id, 10);

		try {
			const deletedDashboard = await this.DashboardService.delete(id);
			res.status(200).send(deletedDashboard);
		} catch (err) {
			console.error(err);
			res.status(500).send({ error: 'Failed to delete dashboard' });
		}
	}
}

const dashboardController = new DashboardController(new DashboardService());
export default dashboardController;
