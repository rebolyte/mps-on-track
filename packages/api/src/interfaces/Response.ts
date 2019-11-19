/**
 * Standard API response object
 */
interface ApiResponse {
	data?: any;
	meta?: { [key: string]: any };
	errors?: Error[];
	message?: string;
}

export default ApiResponse;
