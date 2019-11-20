import * as sql from 'mssql';
// import stream from 'stream';

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

		// const stringifier = new stream.Transform({
		// 	transform(data, enc, cb) {
		// 		this.push(JSON.stringify(data));
		// 		cb();
		// 	},
		// 	objectMode: true
		// });

		// const request = new sql.Request(this.db);

		// (request.pipe(stringifier) as stream.Transform).pipe(res);

		// request.query('SELECT TOP (5) * FROM [gradCredits].[StudentCourseCredits]');
	}
}
