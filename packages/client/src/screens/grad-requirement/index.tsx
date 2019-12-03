import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Bar } from 'react-chartjs-2';

import { useStores } from '../../stores';

const chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	gray: 'rgb(201, 203, 207)'
};

const resp = {
	data: [
		{
			GradRequirement: 'ELA 9',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 1,
			RemainingCreditsRequiredByGraduation: 0,
			DisplayOrder: 1
		},
		{
			GradRequirement: 'ELA 10',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 1,
			DisplayOrder: 2
		},
		{
			GradRequirement: 'ELA 11',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 1,
			DisplayOrder: 3
		},
		{
			GradRequirement: 'ELA 12',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 1,
			DisplayOrder: 4
		},
		{
			GradRequirement: 'Geography',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 0.5,
			RemainingCreditsRequiredByGraduation: 0,
			DisplayOrder: 5
		},
		{
			GradRequirement: 'US History',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 1,
			DisplayOrder: 6
		},
		{
			GradRequirement: 'World History',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 1,
			DisplayOrder: 7
		},
		{
			GradRequirement: 'Government and Citizenship',
			EarnedGradCredits: 0.5,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 0,
			DisplayOrder: 8
		},
		{
			GradRequirement: 'Economics',
			EarnedGradCredits: 0.5,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 0,
			DisplayOrder: 9
		},
		{
			GradRequirement: 'Intermediate Algebra',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 1,
			RemainingCreditsRequiredByGraduation: 0,
			DisplayOrder: 10
		},
		{
			GradRequirement: 'Geometry',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 1,
			DisplayOrder: 11
		},
		{
			GradRequirement: 'Advanced Algebra',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 1,
			DisplayOrder: 12
		},
		{
			GradRequirement: 'Physical Science',
			EarnedGradCredits: 1,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 0,
			DisplayOrder: 13
		},
		{
			GradRequirement: 'Biology',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 1,
			DisplayOrder: 14
		},
		{
			GradRequirement: 'Chemistry or Physics',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 1,
			DisplayOrder: 15
		},
		{
			GradRequirement: 'Fine Arts',
			EarnedGradCredits: 1,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 0,
			DisplayOrder: 16
		},
		{
			GradRequirement: 'Physical Education',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 0.5,
			RemainingCreditsRequiredByGraduation: 0,
			DisplayOrder: 17
		},
		{
			GradRequirement: 'Health',
			EarnedGradCredits: 0.5,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 0,
			DisplayOrder: 18
		},
		{
			GradRequirement: 'Electives',
			EarnedGradCredits: 2.82,
			RemainingCreditsRequiredByLastGradedQuarter: 0,
			RemainingCreditsRequiredByGraduation: 3.18,
			DisplayOrder: 19
		},
		{
			GradRequirement: 'Language Arts',
			EarnedGradCredits: 0,
			RemainingCreditsRequiredByLastGradedQuarter: 1,
			RemainingCreditsRequiredByGraduation: 3,
			DisplayOrder: 20
		}
	],
	errors: []
};

const data = {
	labels: resp.data.map(item => item.GradRequirement),
	datasets: [
		{
			label: 'Earned Credits',
			backgroundColor: chartColors.blue,
			data: resp.data.map(item => item.EarnedGradCredits)
		},
		{
			label: 'Remaining Credits Required By Last Graded Quarter',
			backgroundColor: chartColors.red,
			data: resp.data.map(item => item.RemainingCreditsRequiredByLastGradedQuarter)
		},
		{
			label: 'Remaining Credits Required By Graduation',
			backgroundColor: chartColors.gray,
			data: resp.data.map(item => item.RemainingCreditsRequiredByGraduation)
		}
	]
};

const GradRequirements: FC = observer(() => {
	const { appStore } = useStores();

	return (
		<div className="container min-h-md">
			grad requirements {appStore.count}
			<button className="btn" onClick={appStore.increment}>
				inc
			</button>
			<Bar
				data={data}
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

export default GradRequirements;
