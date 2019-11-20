CREATE SCHEMA [gradCredits]
GO


CREATE TABLE [gradCredits].[StudentsData](
	[StudentNameSortOrder] [int] NOT NULL,
	[StudentUSI] [int] NOT NULL,
	[StudentID] [nvarchar](25) NOT NULL,
	[StudentName] [nvarchar](225) NULL,
	[SchoolName] [nvarchar](255) NULL,
	[LastGradedQtr] [varchar](10) NULL,
	[CurrentGradeLevel] [varchar](50) NULL,
	[CreditDeficiencyStatus] [varchar](50) NULL,
	[TotalCreditsEarned] [decimal](9, 2) NULL,
	[TotalGradCreditsEarned] [decimal](9, 2) NULL,
	[SurnameGroup] [varchar](5) NULL,
 CONSTRAINT [PRK_StudentsData] PRIMARY KEY CLUSTERED 
(
	[StudentUSI] ASC,
	[StudentNameSortOrder] ASC,
	[StudentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO



CREATE TABLE [gradCredits].[StudentCourseCredits](
	[StudentNameSortOrder] [int] NULL,
	[StudentUSI] [int] NULL,
	[StudentID] [nvarchar](25) NULL,
	[StudentName] [nvarchar](225) NULL,
	[SchoolName] [nvarchar](255) NULL,
	[CourseDetails] [nvarchar](255) NULL,
	[ComputationStatus] [varchar](50) NULL,
	[GradRequirement] [varchar](50) NULL,
	[Credits] [decimal](9, 2) NULL,
	[SurnameGroup] [varchar](5) NULL,
	[GradeDetails] [nvarchar](255) NULL,
	[SchoolYearWhenTaken] [int] NULL,
	[DisplayOrder] [int] NULL,
	[Term] [varchar](25) NULL,
	[GradRequirementGroup] [nvarchar](100) NULL
) ON [PRIMARY]
GO

ALTER TABLE [gradCredits].[StudentCourseCredits]  WITH CHECK ADD  CONSTRAINT [FRK_StudentCourseCredits] FOREIGN KEY([StudentUSI], [StudentNameSortOrder], [StudentID])
REFERENCES [gradCredits].[StudentsData] ([StudentUSI], [StudentNameSortOrder], [StudentID])
GO



CREATE TABLE [gradCredits].[StudentsChartData](
	[StudentNameSortOrder] [int] NULL,
	[StudentUSI] [int] NULL,
	[StudentID] [nvarchar](25) NULL,
	[StudentName] [nvarchar](225) NULL,
	[SchoolId] [int] NULL,
	[SchoolName] [nvarchar](255) NULL,
	[LastGradedQtr] [varchar](10) NULL,
	[CurrentGradeLevel] [varchar](50) NULL,
	[GradRequirement] [varchar](50) NULL,
	[EarnedGradCredits] [decimal](9, 2) NULL,
	[RemainingCreditsRequiredByLastGradedQuarter] [decimal](9, 2) NULL,
	[RemainingCreditsRequiredByEndOfCurrentGradeLevel] [decimal](9, 2) NULL,
	[RemainingCreditsRequiredByGraduation] [decimal](9, 2) NULL,
	[CreditDeficiencyStatus] [varchar](50) NULL,
	[TotalCreditsEarned] [decimal](9, 2) NULL,
	[TotalGradCreditsEarned] [decimal](9, 2) NULL,
	[GradeWhenRequired] [varchar](50) NULL,
	[CreditValueRequired] [decimal](9, 2) NULL,
	[CreditValueRemaining] [decimal](9, 2) NULL,
	[Q1] [varchar](4) NULL,
	[Q2] [varchar](4) NULL,
	[Q3] [varchar](4) NULL,
	[Q4] [varchar](4) NULL,
	[DisplayQuarter] [varchar](25) NULL,
	[DisplayOrder] [int] NULL,
	[SurnameGroup] [varchar](5) NULL,
	[GradRequirementGroup] [nvarchar](100) NULL
) ON [PRIMARY]
GO

ALTER TABLE [gradCredits].[StudentsChartData]  WITH CHECK ADD  CONSTRAINT [FRK_StudentsChartData] FOREIGN KEY([StudentUSI], [StudentNameSortOrder], [StudentID])
REFERENCES [gradCredits].[StudentsData] ([StudentUSI], [StudentNameSortOrder], [StudentID])
GO

ALTER TABLE [gradCredits].[StudentsChartData] CHECK CONSTRAINT [FRK_StudentsChartData]
GO


CREATE TABLE [gradCredits].[RawStudentsGrades](
	[StudentNameSortOrder] [int] NULL,
	[StudentUSI] [int] NULL,
	[StudentID] [nvarchar](25) NULL,
	[StudentName] [nvarchar](255) NULL,
	[CourseSchoolId] [int] NULL,
	[CurrentSchoolId] [int] NULL,
	[CurrentSchoolYear] [int] NULL,
	[SchoolYearWhenTaken] [int] NULL,
	[CurrentQtr] [varchar](10) NULL,
	[CurrentGradeLevel] [varchar](50) NULL,
	[GradeLevelWhenTaken] [varchar](50) NULL,
	[QuarterWhenTaken] [varchar](10) NULL,
	[CourseSubjectArea] [nvarchar](255) NULL,
	[CourseCode] [nvarchar](25) NULL,
	[CourseTitle] [nvarchar](255) NULL,
	[Term] [varchar](25) NULL,
	[ComputationCredits] [decimal](9, 2) NULL,
	[EarnedCredits] [decimal](9, 2) NULL,
	[CourseDetails] [nvarchar](500) NULL,
	[GradeDetails] [nvarchar](255) NULL,
	[Status] [varchar](25) NULL,
	[ComputationStatus] [varchar](50) NULL,
	[UtilitySheetCreditValue] [decimal](9, 2) NULL,
	[SpecificGradRequirement] [varchar](50) NULL,
	[FirstSequenceGradRequirement] [varchar](50) NULL,
	[SecondSequenceGradRequirement] [varchar](50) NULL,
	[ThirdSequenceGradRequirement] [varchar](50) NULL,
	[FourthSequenceGradRequirement] [varchar](50) NULL,
	[DisplayOrder] [int] NULL,
	[SurnameGroup] [varchar](5) NULL
) ON [PRIMARY]
GO

ALTER TABLE [gradCredits].[RawStudentsGrades]  WITH CHECK ADD  CONSTRAINT [FRK_RawStudentsGrades] FOREIGN KEY([StudentUSI], [StudentNameSortOrder], [StudentID])
REFERENCES [gradCredits].[StudentsData] ([StudentUSI], [StudentNameSortOrder], [StudentID])
GO

ALTER TABLE [gradCredits].[RawStudentsGrades] CHECK CONSTRAINT [FRK_RawStudentsGrades]
GO
