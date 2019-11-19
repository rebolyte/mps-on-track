import { User } from '../../interfaces';

// This property is added by express-jwt, so we add it on the type side via declaration merging
declare module 'express-serve-static-core' {
	interface Request {
		user: User;
	}
	interface Response {
		user: User;
	}
}
