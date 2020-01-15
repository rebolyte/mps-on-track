import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { StudentDataResponse, StudentAtAGlanceResponse } from '@mps/api';
import { useStores } from '../../stores';
import { Async, uniqueIdRandom } from '../../utilities';
import { Spinner, DataTable } from '../../components';

interface StudentDataProps {
	data: StudentDataResponse | null;
}
interface AtAGlanceTableProps {
	data: StudentAtAGlanceResponse;
}

const StudentData: FC<StudentDataProps> = observer(({ data }: StudentDataProps) => {
	if (data === null) {
		return <p>Student data not found.</p>;
	} else {
		return (
			<DataTable
				cols={[
					{ id: 'StudentName', title: '' },
					{ id: 'TotalGradCreditsEarned', title: 'Total Grad Credits Earned' },
					{
						id: 'TotalCreditsEarned',
						title: 'Total Credits Earned'
					},
					{
						id: 'CurrentGradeLevel',
						title: 'Current Grade Level'
					},
					{ id: 'LastGradedQtr', title: 'Last Graded Quarter' },
					{ id: 'CreditDeficiencyStatus', title: 'Credit Deficiency Status' }
				]}
				data={[data]}
				idProp={row => row.StudentName}
			/>
		);
	}
});

interface Item {
	name: string;
	[key: string]: any;
}

const AtAGlanceTable: FC<AtAGlanceTableProps> = observer(({ data }: AtAGlanceTableProps) => {
	const tableData: Item[] = data.Items.reduce((acc, cur) => {
		const group: Item = { name: cur.GradRequirementGroup, groupRow: true };
		const items: Item[] = cur.GradRequirements.map(({ GradRequirement, ...rest }) => ({
			name: GradRequirement,
			...rest
		}));
		return [...acc, group, ...items];
	}, [] as any);

	return (
		<DataTable
			cols={[
				{ id: 'name', title: '' },
				{ id: 'EarnedGradCredits', title: 'Earned Grad Credits' },
				{ id: 'CreditValueRequired', title: 'Credit Value Required' },
				{ id: 'CreditValueRemaining', title: 'Credit Value Remaining' }
			]}
			data={tableData}
			summarize={_data => {
				return [
					{
						id: uniqueIdRandom(),
						values: [
							{ id: 'name', value: 'Total' },
							{ id: 'EarnedGradCredits', value: data.TotalGradCredits },
							{
								id: 'CreditValueRequired',
								value: data.TotalCreditsRequired
							},
							{
								id: 'CreditValueRemaining',
								value: data.TotalCreditsRemaining
							}
						]
					}
				];
			}}
			idProp={row => row.name}
			striped={false}
			styleRow={row => (row['groupRow'] ? 'font-semibold bg-edfi-lightergray' : undefined)}
		/>
	);
});

const AtAGlance: FC = observer(() => {
	const { reportStore } = useStores();

	return (
		<>
			<Async
				promiseFn={reportStore.getStudentData}
				pending={() => <Spinner />}
				rejected={(err: Error) => <div>Oops! {err}</div>}
				fulfilled={(resp: any) => <StudentData data={resp.data} />}
			/>
			<Async
				promiseFn={reportStore.getStudentAtAGlance}
				pending={() => <Spinner />}
				rejected={(err: Error) => <div>Oops! {err}</div>}
				fulfilled={(resp: any) => <AtAGlanceTable data={resp.data} />}
			/>
		</>
	);
});

export default AtAGlance;
