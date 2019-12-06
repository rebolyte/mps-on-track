import * as sql from 'mssql';
import { groupBy } from 'lodash';

import {
	StudentGradeBreakdownResponse,
	StudentDataResponse,
	StudentAtAGlanceResponse
} from '../models';
import { StudentCourseCreditResponse } from '../models/StudentCourseCredit';

interface StudentGradeBreakdownQuery {
	GradRequirement: string;
	EarnedGradCredits: number;
	RemainingCreditsRequiredByLastGradedQuarter: number;
	RemainingCreditsRequiredByEndOfCurrentGradeLevel: number;
	RemainingCreditsRequiredByGraduation: number;
	TotalGradCredits: number;
	TotalRequiredByLastGradedQuarter: number;
	TotalRequiredByEndOfCurrentGradeLevel: number;
	TotalRequiredByGraduation: number;
	DisplayOrder: number;
}

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

interface StudentCourseCreditsQuery {
	CourseDetails: string;
	SchoolYearWhenTaken: number;
	Term: string;
	GradeDetails: string;
	Credits: number;
	DisplayOrder: number;
}

export default class StudentService {
	private db: sql.ConnectionPool;

	constructor(db: sql.ConnectionPool) {
		this.db = db;
	}

	async getGradeBreakdownForStudent(studentId: string): Promise<StudentGradeBreakdownResponse> {
		const data = await this.db.query<StudentGradeBreakdownQuery>`SELECT GradRequirement,
			EarnedGradCredits,
			RemainingCreditsRequiredByLastGradedQuarter,
			RemainingCreditsRequiredByEndOfCurrentGradeLevel,
			RemainingCreditsRequiredByGraduation,
			SUM(EarnedGradCredits) OVER () as TotalGradCredits,
			SUM(RemainingCreditsRequiredByLastGradedQuarter) OVER () as TotalRequiredByLastGradedQuarter,
			SUM(RemainingCreditsRequiredByEndOfCurrentGradeLevel) OVER () as TotalRequiredByEndOfCurrentGradeLevel,
			SUM(RemainingCreditsRequiredByGraduation) OVER () as TotalRequiredByGraduation,
			DisplayOrder
		FROM [gradCredits].[StudentsChartData]
		WHERE StudentID = ${studentId}
		ORDER BY DisplayOrder`;

		const items = data.recordset.map(item => {
			const {
				TotalGradCredits,
				TotalRequiredByLastGradedQuarter,
				TotalRequiredByEndOfCurrentGradeLevel,
				TotalRequiredByGraduation,
				...rest
			} = item;

			return rest;
		});

		return {
			TotalGradCredits: data.recordset[0].TotalGradCredits,
			TotalRequiredByLastGradedQuarter: data.recordset[0].TotalRequiredByLastGradedQuarter,
			TotalRequiredByEndOfCurrentGradeLevel:
				data.recordset[0].TotalRequiredByEndOfCurrentGradeLevel,
			TotalRequiredByGraduation: data.recordset[0].TotalRequiredByGraduation,
			Items: items
		};
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

	async getCourseCredits(studentId: string): Promise<StudentCourseCreditResponse> {
		const data = await this.db.query<StudentCourseCreditsQuery>`SELECT CourseDetails,
			SchoolYearWhenTaken,
			Term,
			GradeDetails,
			Credits,
			DisplayOrder
		FROM [gradCredits].[StudentCourseCredits]
		WHERE StudentID = ${studentId}
		ORDER BY DisplayOrder`;

		const byYear = groupBy(data.recordset, item => item.SchoolYearWhenTaken);

		const byYearGrade = Object.entries(byYear).map(([year, list]) => {
			const byGrade = groupBy(list, item => item.GradeDetails);

			const details = Object.entries(byGrade).map(([grade, courses]) => ({
				Grade: grade,
				Courses: courses.map(({ SchoolYearWhenTaken, GradeDetails, Term, ...rest }) => rest)
			}));

			return {
				SchoolYear: year,
				GradeDetails: details
			};
		});

		return {
			Items: byYearGrade
		};
	}
}
