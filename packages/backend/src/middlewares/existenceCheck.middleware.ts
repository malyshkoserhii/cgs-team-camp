import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Model = 'todoItem' | 'dashboard';

interface ExistenceCheckOptions {
	model: Model;
	idParam: string;
}

export const checkExistence = (
	options: ExistenceCheckOptions,
): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const { model, idParam } = options;
		const id = Number(req.params[idParam]);

		if (isNaN(id)) {
			return res.status(400).json({ error: 'Invalid ID format' });
		}

		try {
			let exists = false;

			switch (model) {
				case 'todoItem':
					exists =
						(await prisma.todoItem.findUnique({
							where: { id },
						})) !== null;
					break;
				case 'dashboard':
					exists =
						(await prisma.dashboard.findUnique({
							where: { id },
						})) !== null;
					break;
				default:
					return res.status(500).json({ error: 'Unknown model' });
			}

			if (!exists) {
				return res.status(404).json({ error: `${model} not found` });
			}

			next();
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: 'Internal server error' });
		}
	};
};
