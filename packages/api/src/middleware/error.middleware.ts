import { ErrorRequestHandler } from 'express';

const clientErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send(err.inner);
		// Note that we're not passing on this "error" to Winston
	} else {
		res.status(500).send(err);
		next(err);
	}
};

export default clientErrorHandler;
