import * as sql from 'mssql';

import { StudentChartDataResponse } from '../models';

export default class StudentService {
	private db: sql.ConnectionPool;

	constructor(db: sql.ConnectionPool) {
		this.db = db;
	}

	async getChartDataForStudent(studentId: string) {
		const data = await this.db.query<StudentChartDataResponse>`SELECT GradRequirement,
			EarnedGradCredits,
			RemainingCreditsRequiredByLastGradedQuarter,
			RemainingCreditsRequiredByGraduation,
			DisplayOrder
		FROM [gradCredits].[StudentsChartData]
		WHERE StudentID = ${studentId}
		ORDER BY DisplayOrder`;

		return data.recordset;
	}
}
