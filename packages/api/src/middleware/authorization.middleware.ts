import { RequestHandler } from 'express';

/**
 * Forbid users from requested records for a different student than what's in their token
 */
const authorizationMiddleware: RequestHandler = (req, res, next) => {
	if (req.user.uniqueStudentId !== req.params.id) {
		res.status(403).json('Unauthorized');
	} else {
		next();
	}
};

export default authorizationMiddleware;
