import * as sql from 'mssql';

import { StudentGradeBreakdownResponse, StudentDataResponse } from '../models';

export default class StudentService {
	private db: sql.ConnectionPool;

	constructor(db: sql.ConnectionPool) {
		this.db = db;
	}

	async getGradeBreakdownForStudent(studentId: string) {
		const data = await this.db.query<StudentGradeBreakdownResponse>`SELECT GradRequirement,
			EarnedGradCredits,
			RemainingCreditsRequiredByLastGradedQuarter,
			RemainingCreditsRequiredByEndOfCurrentGradeLevel,
			RemainingCreditsRequiredByGraduation,
			DisplayOrder
		FROM [gradCredits].[StudentsChartData]
		WHERE StudentID = ${studentId}
		ORDER BY DisplayOrder`;

		return data.recordset;
	}

	async getStudentData(studentId: string) {
		const data = await this.db.query<StudentDataResponse>`SELECT StudentName,
			TotalCreditsEarned,
			TotalGradCreditsEarned,
			CurrentGradeLevel,
			LastGradedQtr,
			CreditDeficiencyStatus
		FROM [gradCredits].[StudentsData]
		WHERE StudentID = ${studentId}`;

		return data.recordset[0];
	}
}
