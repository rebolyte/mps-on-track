import { Router, RequestHandler } from 'express';
import * as sql from 'mssql';

import { Controller } from '../interfaces';
import { authorizationMiddleware } from '../middleware';
import { StudentService } from '../services';

export default class StudentController implements Controller {
	private readonly studentService: StudentService;
	public readonly path = '/students';
	public readonly router: Router = Router();

	constructor(db: sql.ConnectionPool) {
		this.studentService = new StudentService(db);

		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/:id/report1`, authorizationMiddleware('id'), this.getOne);
	}

	private getOne: RequestHandler = async (req, res, next) => {
		const { id } = req.params;

		try {
			const data = await this.studentService.getReport1ForStudent(id);

			res.json(data);
		} catch (err) {
			next(err);
		}
	};
}
