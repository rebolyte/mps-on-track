export interface StudentCourseCredit {
	StudentNameSortOrder: number | null;
	StudentUSI: number | null;
	StudentID: string | null;
	StudentName: string | null;
	SchoolName: string | null;
	CourseDetails: string | null;
	ComputationStatus: string | null;
	GradRequirement: string | null;
	Credits: number | null;
	SurnameGroup: string | null;
	GradeDetails: string | null;
	SchoolYearWhenTaken: number | null;
	DisplayOrder: number | null;
	Term: string | null;
	GradRequirementGroup: string | null;
}

export interface CourseCreditItem {
	CourseDetails: string;
	Credits: number;
	DisplayOrder: number;
}

export interface CourseGradeDetails {
	Grade: string;
	Courses: CourseCreditItem[];
}

export interface StudentCourseCreditYear {
	SchoolYear: string;
	GradeDetails: CourseGradeDetails[];
}

export interface StudentCourseCreditResponse {
	Items: StudentCourseCreditYear[];
}
