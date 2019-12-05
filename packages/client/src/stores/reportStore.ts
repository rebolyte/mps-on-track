import { observable, action } from 'mobx';

import api from '../api';

export class ReportStore {
	@observable studentId = '';

	@action
	setStudent = (studentId: string) => {
		this.studentId = studentId;
	};

	getStudentData = async () => {
		return api.getStudentData(this.studentId);
	};

	getStudentGradeBreakdown = async () => {
		return api.getStudentGradeBreakdown(this.studentId);
	};

	getStudentAtAGlance = async () => {
		return api.getStudentAtAGlance(this.studentId);
	};
}
