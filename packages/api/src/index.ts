import { config } from 'dotenv';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import findConfig from 'find-config';

config({ path: findConfig('.env') });

import Server from './server';
import { connect } from './db-connect';
import controllers from './controllers';

async function main() {
	try {
		await connect();

		const server = new Server(controllers.map(Controller => new Controller()));

		server.listen();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

main();
