import 'dotenv/config';
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { errorMiddleware } from './middleware/error.middleware';
import AppRouter from './routes';

const port = 3030;
const app: Express = express();
const router = new AppRouter(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
router.init();
app.use(errorMiddleware);
app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
