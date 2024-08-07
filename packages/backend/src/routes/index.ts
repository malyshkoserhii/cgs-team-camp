import { Application } from 'express';
import todosRouter from './api/todos.route';
import userRouter from './api/user.route';
import dashboardRouter from './api/dashboard.route';

class AppRouter {
	constructor(private app: Application) {}

	init(): void {
		this.app.use('/api/todos', todosRouter);
		this.app.use('/api/dashboard', dashboardRouter);
		this.app.use('/api/user', userRouter);
	}
}

export default AppRouter;
