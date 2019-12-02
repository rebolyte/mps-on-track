import { RequestHandler } from 'express';

export type GenMiddleware = (...args: any) => RequestHandler;

/**
 * Forbid users from requesting records for a different student than what's in their token
 */
const authorizationMiddleware: GenMiddleware = (param: string) => (req, res, next) => {
	if (req.user.uniqueStudentId !== req.params[param]) {
		res.status(403).json('Unauthorized');
	} else {
		next();
	}
};

export default authorizationMiddleware;
