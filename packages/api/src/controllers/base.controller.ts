import { Router, RequestHandler } from 'express';
import * as sql from 'mssql';
import jwt from 'jsonwebtoken';
import url from 'url';

import { Controller } from '../interfaces';

const { JWT_SECRET, JWT_AUDIENCE, JWT_ISSUER } = process.env;

export default class BaseController implements Controller {
	private db: sql.ConnectionPool;
	public path = '/';
	public router: Router = Router();

	constructor(db: sql.ConnectionPool) {
		this.db = db;
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/', (req, res) => {
			res.send({ message: 'MPS On Track API' });
		});

		this.router.get('/health', (req, res) => {
			res.send({ message: 'healthy' });
		});

		this.router.get('/token', this.getToken);
	}

	// For testing purposes only
	private getToken: RequestHandler = (_req, res, next) => {
		try {
			const claims = {
				uniqueStudentId: 'abc123'
			};

			const token = jwt.sign(claims, JWT_SECRET as string, {
				expiresIn: '14d',
				audience: JWT_AUDIENCE,
				issuer: JWT_ISSUER
			});

			res.redirect(
				url.format({
					pathname: 'http://localhost:8001',
					query: {
						token
					}
				})
			);
		} catch (err) {
			next(err);
		}
	};
}
