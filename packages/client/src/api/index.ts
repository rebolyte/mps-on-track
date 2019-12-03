import wretch from 'wretch';

import { ApiResponse } from '@models';
import { authStore } from '@stores';

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
			.catcher(401, async (err, req) => {
				console.log('Got 401, reauthorizing!');
				await authStore.authorize(); // calls this.setBearerToken
				if (this.token) {
					return req
						.auth(`Bearer ${this.token}`)
						.catcher(401, (errInner, _reqInner) => {
							return this.handleError(errInner);
						})
						.replay()
						.then(resp => (typeof resp.json === 'function' ? resp.json() : resp));
				}
				return req;
			})
			.catcher(500, err => {
				alert('Uh oh! An internal server error occurred.');
				console.error(err);
				return Promise.reject(err.message);
			})
			.catcher(404, err => {
				return Promise.reject(err.message);
			})
			.catcher(400, err => {
				return this.handleError(err);
			})
			.resolve(chain => chain.json());

	// me
	getMe = () => this._base('/me').get() as Promise<ApiResponse<User>>;

	resetMyPassword = (body: { oldPassword: string; newPassword: string }) =>
		this._base('/me/resetpasswordme').put(body) as Promise<ApiResponse<User>>;
}

export default new Api();
