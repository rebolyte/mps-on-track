interface RawStudentGrade {
	StudentNameSortOrder: number | null;
	StudentUSI: number | null;
	StudentID: string | null;
	StudentName: string | null;
	CourseSchoolId: number | null;
	CurrentSchoolId: number | null;
	CurrentSchoolYear: number | null;
	SchoolYearWhenTaken: number | null;
	CurrentQtr: string | null;
	CurrentGradeLevel: string | null;
	GradeLevelWhenTaken: string | null;
	QuarterWhenTaken: string | null;
	CourseSubjectArea: string | null;
	CourseCode: string | null;
	CourseTitle: string | null;
	Term: string | null;
	ComputationCredits: number | null;
	EarnedCredits: number | null;
	CourseDetails: string | null;
	GradeDetails: string | null;
	Status: string | null;
	ComputationStatus: string | null;
	UtilitySheetCreditValue: number | null;
	SpecificGradRequirement: string | null;
	FirstSequenceGradRequirement: string | null;
	SecondSequenceGradRequirement: string | null;
	ThirdSequenceGradRequirement: string | null;
	FourthSequenceGradRequirement: string | null;
	DisplayOrder: number | null;
	SurnameGroup: string | null;
}

export default RawStudentGrade;
