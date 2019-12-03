import wretch from 'wretch';

import { ApiResponse, StudentChartDataResponse } from '@mps/api';

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
			.catcher(401, async err => {
				return this.handleError(err);
			})
			.catcher(400, err => {
				return this.handleError(err);
			})
			.resolve(chain => chain.json());

	getStudentChartData = (studentId: string) =>
		this._base(`/students/${studentId}/student-chart-data`).get() as Promise<
			ApiResponse<StudentChartDataResponse[]>
		>;
}

export default new Api();
