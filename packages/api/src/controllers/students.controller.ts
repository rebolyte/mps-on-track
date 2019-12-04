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
		this.router.get(
			`${this.path}/:id/student-grade-breakdown`,
			authorizationMiddleware('id'),
			this.getStudentGradeBreakdown
		);

		this.router.get(
			`${this.path}/:id/student-data`,
			authorizationMiddleware('id'),
			this.getStudentData
		);
	}

	private getStudentGradeBreakdown: RequestHandler = async (req, res, next) => {
		const { id } = req.params;

		try {
			const data = await this.studentService.getGradeBreakdownForStudent(id);

			res.json(data);
		} catch (err) {
			next(err);
		}
	};

	private getStudentData: RequestHandler = async (req, res, next) => {
		const { id } = req.params;

		try {
			const data = await this.studentService.getStudentData(id);

			res.json(data);
		} catch (err) {
			next(err);
		}
	};
}
