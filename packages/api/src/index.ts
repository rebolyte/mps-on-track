import { config } from 'dotenv';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import findConfig from 'find-config';

config({ path: findConfig('.env') });

import express, { Router, ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import winston from 'winston';
import expressWinston from 'express-winston';

import { connect } from './db-connect';

const PORT = process.env.API_PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;

async function main() {
	try {
		const conn = await connect();

		const request = conn.request();
		const result = await request.query('select 1 as number');

		console.log('result', result);

		const app = express();

		app.use(helmet());
		app.use(cors());
		app.use(bodyParser.json());

		winston.loggers.add('serverside', {
			transports: [
				new winston.transports.Console({
					level: 'info'
				})
				// new winston.transports.File({
				// 	filename: 'test-log.log',
				// 	level: 'info'
				// })
			]
		});

		app.use(
			expressWinston.logger({
				winstonInstance: winston.loggers.get('serverside'),
				meta: true,
				requestWhitelist: ['url', 'headers', 'method', 'query', 'user']
			})
		);

		// eslint-disable-next-line new-cap
		const apiRoutes = Router();

		apiRoutes.use(
			expressJwt({
				secret: JWT_SECRET as string
			}).unless({
				path: ['/api', '/api/health']
			})
		);

		apiRoutes.get('/', (req, res) => {
			res.send({ message: 'MPS On Track API' });
		});

		apiRoutes.get('/health', (req, res) => {
			res.send({ message: 'healthy' });
		});

		apiRoutes.get('/report1', (req, res) => {
			res.send({ message: 'report1' });
		});

		app.use('/api', apiRoutes);

		// "You define error-handling middleware last, after other app.use() and routes calls"
		const clientErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
			if (err.name === 'UnauthorizedError') {
				res.status(401).send(err.inner);
				// Note that we're not passing on this "error" to Winston
			} else {
				res.status(500).send(err);
				next(err);
			}
		};

		// register route middleware to return nice errors instead of JS stacktraces
		app.use(clientErrorHandler);

		// express-winston errorLogger makes sense AFTER the router.
		app.use(
			expressWinston.errorLogger({
				transports: [
					new winston.transports.Console({})
					// new winston.transports.File({
					// 	filename: 'test-err.log'
					// })
				]
			})
		);

		app.listen(PORT, () => {
			console.log(`Server ready at http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error(err);
	}
}

main();
