import { observable, action } from 'mobx';

import api from '../api';

export class ReportStore {
	@observable studentId = '';

	@action
	setStudent = (studentId: string) => {
		this.studentId = studentId;
	};

	getStudentChartData = async () => {
		return api.getStudentChartData(this.studentId);
	};
}
