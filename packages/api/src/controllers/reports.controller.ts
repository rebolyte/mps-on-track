import { Router, RequestHandler } from 'express';

import { Controller } from '../interfaces';

export default class ReportController implements Controller {
	public path = '/reports';
	public router: Router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/:id`, this.getOne);
	}

	private getOne: RequestHandler = async (req, res, next) => {
		const { id } = req.params;

		try {
			const data: any = { a: 1, id }; // retrieve data here
			res.send(data);
		} catch (err) {
			next(err);
		}
	};
}
