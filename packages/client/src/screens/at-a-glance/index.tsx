import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { StudentDataResponse } from '@mps/api';
import { useStores } from '../../stores';
import { Async } from '../../utilities';
import { Spinner, DataTable } from '../../components';

interface StudentDataProps {
	data: StudentDataResponse;
}

const StudentData: FC<StudentDataProps> = observer(({ data }: StudentDataProps) => {
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
		</>
	);
});

export default AtAGlance;
