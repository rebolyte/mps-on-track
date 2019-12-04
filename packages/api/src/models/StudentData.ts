export interface StudentData {
	StudentNameSortOrder: number;
	StudentUSI: number;
	StudentID: string;
	StudentName: string | null;
	SchoolName: string | null;
	LastGradedQtr: string | null;
	CurrentGradeLevel: string | null;
	CreditDeficiencyStatus: string | null;
	TotalCreditsEarned: number | null;
	TotalGradCreditsEarned: number | null;
	SurnameGroup: string;
}

export interface StudentDataResponse {
	StudentName: string;
	LastGradedQtr: string;
	CurrentGradeLevel: string;
	CreditDeficiencyStatus: string;
	TotalCreditsEarned: number;
	TotalGradCreditsEarned: number;
}
