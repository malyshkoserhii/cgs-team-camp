import cors from 'cors';
import express, { Express } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { errorHandler } from './middlewares/errorHandling.middleware';
import AppRouter from './routes';
const port = 3030;
const app: Express = express();
const router = new AppRouter(app);

app.use(
	cors({
		origin: 'http://localhost:5173',
		optionsSuccessStatus: 200,
	}),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler);

router.init();

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
