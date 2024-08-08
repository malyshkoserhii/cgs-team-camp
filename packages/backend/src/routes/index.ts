import { Application } from 'express';
import todosRouter from './api/todos.route';
import userRouter from './api/user.route';
import dashboardRouter from './api/dashboard.route';
import { authenticateToken } from '@/middlewares/auth.middleware';

class AppRouter {
	constructor(private app: Application) {}

	init(): void {
		this.app.use('/api/todos', authenticateToken, todosRouter);
		this.app.use('/api/dashboard', authenticateToken, dashboardRouter);
		this.app.use('/api/user', userRouter);
	}
}

export default AppRouter;
