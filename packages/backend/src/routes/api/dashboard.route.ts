import { Router } from 'express';
import dashboardController from '@/controllers/dashboard.controller';

const dashboardRouter = Router();

dashboardRouter.get(
	'/',
	dashboardController.getDashboard.bind(dashboardController),
);
dashboardRouter.post(
	'/create',
	dashboardController.createDashboard.bind(dashboardController),
);
dashboardRouter.put(
	'/update/:id',
	dashboardController.updateDashboard.bind(dashboardController),
);
dashboardRouter.delete(
	'/delete/:id',
	dashboardController.deleteDashboard.bind(dashboardController),
);

export default dashboardRouter;
