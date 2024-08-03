import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';

import { generalErrorHandler } from './middlewars/generalErrorHandler';
import AppRouter from './routes';

const { PORT } = process.env;
const app: Express = express();
const router = new AppRouter(app);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
	res.send('Hello Node!');
});

router.init();
app.use(generalErrorHandler);
app.listen(PORT, () => {
	console.log(`Now listening on port ${PORT}`);
});
