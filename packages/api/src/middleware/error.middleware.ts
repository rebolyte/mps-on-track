import { ErrorRequestHandler } from 'express';

const clientErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json(err.inner);
		// Note that we're not passing on this "error" to Winston
	} else {
		res.status(500).json(err);
		next(err);
	}
};

export default clientErrorHandler;
