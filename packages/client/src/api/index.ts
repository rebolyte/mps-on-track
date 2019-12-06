import wretch from 'wretch';

import {
	ApiResponse,
	StudentDataResponse,
	StudentGradeBreakdownResponse,
	StudentAtAGlanceResponse,
	StudentCourseCreditResponse
} from '@mps/api';

const { API_URL } = process.env;

export class Api {
	token?: string;

	badRequestHandler?: (resp: ApiResponse<any>) => any;

	setBearerToken = (token: string) => {
		this.token = token;
	};

	registerBadRequestHandler = (fn: (resp: ApiResponse<any>) => any) => {
		this.badRequestHandler = fn;
	};

	handleError = (err: Error) => {
		try {
			const json: ApiResponse<any> = JSON.parse(err.message);

			if (this.badRequestHandler) {
				this.badRequestHandler(json);
			}
		} catch (err) {}

		return Promise.reject(err.message);
	};

	_base = (url: string, opts: object = {}) =>
		wretch(API_URL)
			.url(url)
			.auth(`Bearer ${this.token}`)
			.query(opts)
			.catcher(500, err => {
				alert('An internal server error occurred.');
				console.error(err);
				return Promise.reject(err.message);
			})
			.catcher(404, err => {
				return Promise.reject(err.message);
			})
			.catcher(403, err => {
				return this.handleError(err);
			})
			.catcher(401, async err => {
				return this.handleError(err);
			})
			.catcher(400, err => {
				return this.handleError(err);
			})
			.resolve(chain => chain.json());

	getStudentData = (studentId: string) =>
		this._base(`/students/${studentId}/student-data`).get() as Promise<
			ApiResponse<StudentDataResponse[]>
		>;

	getStudentGradeBreakdown = (studentId: string) =>
		this._base(`/students/${studentId}/grade-breakdown`).get() as Promise<
			ApiResponse<StudentGradeBreakdownResponse>
		>;

	getStudentAtAGlance = (studentId: string) =>
		this._base(`/students/${studentId}/at-a-glance`).get() as Promise<
			ApiResponse<StudentAtAGlanceResponse>
		>;

	getStudentCourseCredits = (studentId: string) =>
		this._base(`/students/${studentId}/course-credits`).get() as Promise<
			ApiResponse<StudentCourseCreditResponse>
		>;
}

export default new Api();
