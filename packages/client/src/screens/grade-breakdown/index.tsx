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

const StudentCourseCredits: FC<StudentCourseCreditsProps> = observer(
	({ data }: StudentCourseCreditsProps) => {
		return (
			<>
				<h2 className="font-bold text-lg">Courses with Credits Breakdown</h2>
				<pre>{JSON.stringify(data, null, 2)}</pre>
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
