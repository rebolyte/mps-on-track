import { ConnectionPool } from 'mssql';

const { DB_SERVER, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

export const connect = async () => {
	const pool = new ConnectionPool({
		server: DB_SERVER as string,
		port: parseInt(DB_PORT as string, 10),
		database: DB_NAME as string,
		user: DB_USER as string,
		password: DB_PASS as string
	});

	return await pool.connect();
};
