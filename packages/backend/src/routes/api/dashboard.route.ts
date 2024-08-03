import { Router } from 'express';
import { validate } from '@/middlewares/validation.middleware';
import {
	dashboardCreateSchema,
	dashboardUpdateSchema,
} from '@/middlewares/schemas/dashboard.schema';
import DashboardController from '@/controllers/dashboard.controller';
import { tryCatch } from '@/middlewares/errorHandling.middleware';
import dashboardController from '@/controllers/dashboard.controller';
import { checkExistence } from '@/middlewares/existenceCheck.middleware';

const dashboardRouter = Router();

dashboardRouter.use(
	'update/:id',
	checkExistence({ model: 'dashboard', idParam: 'id' }),
);
dashboardRouter.use(
	'delete/:id',
	checkExistence({ model: 'dashboard', idParam: 'id' }),
);

dashboardRouter.post(
	'/create',
	validate(dashboardCreateSchema),
	tryCatch(DashboardController.createDashboard.bind(dashboardController)),
);

dashboardRouter.put(
	'/update/:id',
	validate(dashboardUpdateSchema),
	tryCatch(DashboardController.updateDashboard.bind(DashboardController)),
);

dashboardRouter.get(
	'/',
	tryCatch(DashboardController.getDashboard.bind(DashboardController)),
);

dashboardRouter.delete(
	'/delete/:id',
	tryCatch(DashboardController.deleteDashboard.bind(DashboardController)),
);

export default dashboardRouter;
