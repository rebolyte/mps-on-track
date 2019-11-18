import { config } from 'dotenv';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import findConfig from 'find-config';

config({ path: findConfig('.env') });

import express, { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { connect } from './db-connect';

const PORT = process.env.API_PORT || 4000;

async function main() {
	try {
		const conn = await connect();

		const request = conn.request();
		const result = await request.query('select 1 as number');

		console.log('result', result);

		const app = express();

		app.use(helmet());
		app.use(cors());

		// eslint-disable-next-line new-cap
		const apiRoutes = Router();

		apiRoutes.get('/', (req, res) => {
			res.send({ message: 'backend API' });
		});

		app.use('/api', apiRoutes);

		app.listen(PORT, () => {
			console.log(`Server ready at http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error(err);
	}
}

main();
