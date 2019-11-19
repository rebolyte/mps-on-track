import { Router } from 'express';

import { Controller } from '../interfaces';

export default class BaseController implements Controller {
	public path = '/';
	public router: Router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/', (req, res) => {
			res.send({ message: 'MPS On Track API' });
		});

		this.router.get('/health', (req, res) => {
			res.send({ message: 'healthy' });
		});
	}
}
