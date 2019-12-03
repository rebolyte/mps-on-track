export interface StudentChartData {
	StudentNameSortOrder: number | null;
	StudentUSI: number | null;
	StudentID: string | null;
	StudentName: string | null;
	SchoolId: number | null;
	SchoolName: string | null;
	LastGradedQtr: string | null;
	CurrentGradeLevel: string | null;
	GradRequirement: string | null;
	EarnedGradCredits: number | null;
	RemainingCreditsRequiredByLastGradedQuarter: number | null;
	RemainingCreditsRequiredByEndOfCurrentGradeLevel: number | null;
	RemainingCreditsRequiredByGraduation: number | null;
	CreditDeficiencyStatus: string | null;
	TotalCreditsEarned: number | null;
	TotalGradCreditsEarned: number | null;
	GradeWhenRequired: string | null;
	CreditValueRequired: number | null;
	CreditValueRemaining: number | null;
	Q1: string | null;
	Q2: string | null;
	Q3: string | null;
	Q4: string | null;
	DisplayQuarter: string | null;
	DisplayOrder: number | null;
	SurnameGroup: string | null;
	GradRequirementGroup: string | null;
}

export interface StudentChartDataResponse {
	GradRequirement: string;
	EarnedGradCredits: number;
	RemainingCreditsRequiredByLastGradedQuarter: number;
	RemainingCreditsRequiredByEndOfCurrentGradeLevel: number;
	RemainingCreditsRequiredByGraduation: number;
	DisplayOrder: number;
}
