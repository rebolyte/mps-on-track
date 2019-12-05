import * as sql from 'mssql';
import { groupBy } from 'lodash';

import {
	StudentGradeBreakdownResponse,
	StudentDataResponse,
	StudentAtAGlanceResponse
} from '../models';

interface StudentAtAGlanceQuery {
	GradRequirement: string;
	GradRequirementGroup: string;
	EarnedGradCredits: number;
	CreditValueRequired: number;
	CreditValueRemaining: number;
	TotalGradCredits: number;
	TotalCreditsRequired: number;
	TotalCreditsRemaining: number;
	DisplayOrder: number;
}

export default class StudentService {
	private db: sql.ConnectionPool;

	constructor(db: sql.ConnectionPool) {
		this.db = db;
	}

	async getGradeBreakdownForStudent(studentId: string): Promise<StudentGradeBreakdownResponse[]> {
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

	async getAtAGlanceForStudent(studentId: string): Promise<StudentAtAGlanceResponse> {
		const data = await this.db.query<StudentAtAGlanceQuery>`SELECT GradRequirement,
			GradRequirementGroup,
			EarnedGradCredits,
			CreditValueRequired,
			CreditValueRemaining,
			SUM(EarnedGradCredits) OVER () as TotalGradCredits,
			SUM(CreditValueRequired) OVER () as TotalCreditsRequired,
			SUM(CreditValueRemaining) OVER () as TotalCreditsRemaining,
			DisplayOrder
		FROM [gradCredits].[StudentsChartData]
		WHERE StudentID = ${studentId}
		ORDER BY DisplayOrder`;

		const byGroup = groupBy(data.recordset, item => item.GradRequirementGroup);

		const items = Object.entries(byGroup).map(([groupName, list]) => {
			const reqs = list.map(
				({
					GradRequirementGroup,
					TotalGradCredits,
					TotalCreditsRemaining,
					TotalCreditsRequired,
					...rest
				}) => rest
			);

			return {
				GradRequirementGroup: groupName,
				GradRequirements: reqs
			};
		});

		return {
			TotalGradCredits: data.recordset[0].TotalGradCredits,
			TotalCreditsRequired: data.recordset[0].TotalCreditsRequired,
			TotalCreditsRemaining: data.recordset[0].TotalCreditsRemaining,
			Items: items
		};
	}

	async getStudentData(studentId: string): Promise<StudentDataResponse> {
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
