import { Request, Response, NextFunction } from 'express';

import { ApiResponse } from '../models';

const isProd = process.env.ENV === 'prod';

const formatResponse = (result: any, message?: string): ApiResponse<any> => {
	let errors: any[] = [];
	let data: any = null;

	if (result && result instanceof Array) {
		data = result;
	} else if (result && result instanceof Error) {
		const stringified = isProd
			? { message: result.message }
			: JSON.parse(JSON.stringify(result, Object.getOwnPropertyNames(result)));
		errors = [stringified];
	} else if (result || result === 0) {
		data = result;
	}

	return {
		data,
		errors,
		message
	};
};

function formatResponseMiddleware(req: Request, res: Response, next: NextFunction) {
	const originalMethod = res.json;

	function jsonHook(this: any, json: any) {
		// put the original back
		res.json = originalMethod;

		// format the value
		if (res.statusCode >= 400) {
			json = formatResponse(new Error(json));
		} else {
			json = formatResponse(json);
		}

		// call original with updated body in Express's context
		return originalMethod.call(this, json);
	}

	res.json = jsonHook;

	next();
}

export default formatResponseMiddleware;
