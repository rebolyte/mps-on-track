import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Bar } from 'react-chartjs-2';

import { StudentGradeBreakdownResponse } from '@mps/api';
import { useStores } from '../../stores';
import { Async } from '../../utilities';
import { Spinner } from '../../components';

const chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	gray: 'rgb(201, 203, 207)'
};

interface ChartProps {
	data: StudentGradeBreakdownResponse;
}

const StudentDataChart: FC<ChartProps> = observer(({ data }: ChartProps) => {
	const chartData = {
		labels: data.Items.map(item => item.GradRequirement),
		datasets: [
			{
				label: 'Earned Credits',
				backgroundColor: chartColors.blue,
				data: data.Items.map(item => item.EarnedGradCredits)
			},
			{
				label: 'Remaining Credits Required By Last Graded Quarter',
				backgroundColor: chartColors.red,
				data: data.Items.map(item => item.RemainingCreditsRequiredByLastGradedQuarter)
			},
			{
				label: 'Remaining Credits Required By Graduation',
				backgroundColor: chartColors.gray,
				data: data.Items.map(item => item.RemainingCreditsRequiredByGraduation)
			}
		]
	};

	return (
		<div className="min-h-md">
			<Bar
				data={chartData}
				width={100}
				height={50}
				options={{
					tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						xAxes: [{ stacked: true }],
						yAxes: [{ stacked: true }]
					}
				}}
			/>
		</div>
	);
});

const GradRequirements: FC = observer(() => {
	const { reportStore } = useStores();

	return (
		<Async
			promiseFn={reportStore.getStudentGradeBreakdown}
			pending={() => <Spinner />}
			rejected={(err: Error) => <div>Oops! {err}</div>}
			fulfilled={(resp: any) => <StudentDataChart data={resp.data} />}
		/>
	);
});

export default GradRequirements;
