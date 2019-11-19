import { Router, RequestHandler } from 'express';

import { Controller } from '../interfaces';
import { authorizationMiddleware } from '../middleware';

export default class StudentController implements Controller {
	public path = '/students';
	public router: Router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/:id/report1`, authorizationMiddleware, this.getOne);
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
