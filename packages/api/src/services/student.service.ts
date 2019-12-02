import * as sql from 'mssql';

import { StudentCourseCredit } from '../models';

export default class StudentService {
	private db: sql.ConnectionPool;

	constructor(db: sql.ConnectionPool) {
		this.db = db;
	}

	async getReport1ForStudent(_studentId: string) {
		const data = await this.db.query<StudentCourseCredit>(
			'SELECT TOP (5) * FROM [gradCredits].[StudentCourseCredits]'
		);

		return data.recordset;
	}
}
