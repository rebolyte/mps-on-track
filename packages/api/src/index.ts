import { config } from 'dotenv';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import findConfig from 'find-config';

config({ path: findConfig('.env') });

import Server from './server';
import { connect } from './db-connect';
import controllers from './controllers';

async function main() {
	const conn = await connect();

	const request = conn.request();
	const result = await request.query('select 1 as number');

	console.log('result', result);

	const server = new Server(controllers.map(Controller => new Controller()));

	server.listen();
}

main();
