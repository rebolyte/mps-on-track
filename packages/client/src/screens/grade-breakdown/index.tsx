import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { StudentGradeBreakdownResponse } from '@mps/api';
import { useStores } from '../../stores';
import { Async, uniqueIdRandom } from '../../utilities';
import { Spinner, DataTable } from '../../components';

interface GradeTableProps {
	data: StudentGradeBreakdownResponse[];
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
			summarize={data => {
				if (data.length === 0) {
					return [];
				}
				return [
					{
						id: uniqueIdRandom(),
						values: [
							{ id: 'GradRequirement', value: 'Total' },
							{
								id: 'EarnedGradCredits',
								value: data.reduce((acc, cur) => acc + cur.EarnedGradCredits, 0)
							},
							{
								id: 'RemainingCreditsRequiredByLastGradedQuarter',
								value: data.reduce(
									(acc, cur) => acc + cur.RemainingCreditsRequiredByLastGradedQuarter,
									0
								)
							},
							{
								id: 'RemainingCreditsRequiredByEndOfCurrentGradeLevel',
								value: data.reduce(
									(acc, cur) => acc + cur.RemainingCreditsRequiredByEndOfCurrentGradeLevel,
									0
								)
							},
							{
								id: 'RemainingCreditsRequiredByGraduation',
								value: data.reduce((acc, cur) => acc + cur.RemainingCreditsRequiredByGraduation, 0)
							}
						]
					}
				];
			}}
			data={data}
			idProp={row => row.GradRequirement}
		/>
	);
});

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
		</>
	);
});

export default StudentGradeBreakdown;
