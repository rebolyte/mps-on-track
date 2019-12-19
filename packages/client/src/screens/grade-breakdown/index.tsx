import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
// import {
// 	useTable,
// 	useGroupBy,
// 	useFilters,
// 	useSortBy,
// 	useExpanded,
// 	usePagination
// } from 'react-table';

import { StudentGradeBreakdownResponse, StudentCourseCreditResponse } from '@mps/api';
import { useStores } from '../../stores';
import { Async, uniqueIdRandom } from '../../utilities';
import { Spinner, DataTable } from '../../components';

import './grade-breakdown.css';

interface GradeTableProps {
	data: StudentGradeBreakdownResponse;
}

interface StudentCourseCreditsProps {
	data: StudentCourseCreditResponse;
}

const GradeTable: FC<GradeTableProps> = observer(({ data }: GradeTableProps) => {
	return (
		<DataTable
			cols={[
				{ id: 'GradRequirement', title: '' },
				{ id: 'EarnedGradCredits', title: 'Earned Credits' },
				{
					id: 'RemainingCreditsRequiredByLastGradedQuarter',
					title: 'Remaining Credits by Last Graded Quarter'
				},
				{
					id: 'RemainingCreditsRequiredByEndOfCurrentGradeLevel',
					title: 'Remaining Credits by End of Current Grade Level'
				},
				{ id: 'RemainingCreditsRequiredByGraduation', title: 'Remaining Credits by Graduation' }
			]}
			summarize={_data => {
				return [
					{
						id: uniqueIdRandom(),
						values: [
							{ id: 'GradRequirement', value: 'Total' },
							{
								id: 'EarnedGradCredits',
								value: data.TotalGradCredits
							},
							{
								id: 'RemainingCreditsRequiredByLastGradedQuarter',
								value: data.TotalRequiredByLastGradedQuarter
							},
							{
								id: 'RemainingCreditsRequiredByEndOfCurrentGradeLevel',
								value: data.TotalRequiredByEndOfCurrentGradeLevel
							},
							{
								id: 'RemainingCreditsRequiredByGraduation',
								value: data.TotalRequiredByGraduation
							}
						]
					}
				];
			}}
			data={data.Items}
			idProp={row => row.GradRequirement}
		/>
	);
});

interface Item {
	name: string;
	type: 'schoolYear' | 'grade' | 'courseDetail';
	[key: string]: any;
}

const StudentCourseCredits: FC<StudentCourseCreditsProps> = observer(
	({ data }: StudentCourseCreditsProps) => {
		const tableData: Item[] = data.Items.reduce((acc, cur) => {
			const schoolYear: Item = { name: cur.SchoolYear, type: 'schoolYear' };

			const gradeDetails = cur.GradeDetails.reduce((gradeAcc, gradeCur) => {
				const grade: Item = { name: gradeCur.Grade, type: 'grade' };

				const courses: Item[] = gradeCur.Courses.map(({ CourseDetails, ...rest }) => ({
					name: CourseDetails,
					...rest,
					type: 'courseDetail'
				}));

				return [...gradeAcc, grade, ...courses];
			}, [] as any);

			return [...acc, schoolYear, ...gradeDetails];
		}, [] as any);

		const styleRow = ({ type }: Item) => {
			const classes = {
				schoolYear: 'course-credits-school-year',
				grade: 'course-credits-grade',
				courseDetail: 'course-credits-course-detail'
			};
			return classes[type];
		};

		return (
			<>
				<h2 className="font-bold text-lg">Courses with Credits Breakdown</h2>
				<DataTable
					cols={[
						{ id: 'name', title: '' },
						{ id: 'Credits', title: 'Counts' }
					]}
					data={tableData}
					idProp={row => row.name}
					striped={false}
					styleRow={styleRow}
				/>
			</>
		);
	}
);

const StudentGradeBreakdown: FC = observer(() => {
	const { reportStore } = useStores();

	return (
		<>
			<Async
				promiseFn={reportStore.getStudentGradeBreakdown}
				pending={() => <Spinner />}
				rejected={(err: Error) => <div>Oops! {err}</div>}
				fulfilled={(resp: any) => <GradeTable data={resp.data} />}
			/>
			<Async
				promiseFn={reportStore.getStudentCourseCredits}
				pending={() => <Spinner />}
				rejected={(err: Error) => <div>Oops! {err}</div>}
				fulfilled={(resp: any) => <StudentCourseCredits data={resp.data} />}
			/>
		</>
	);
});

export default StudentGradeBreakdown;
