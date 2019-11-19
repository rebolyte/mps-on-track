/**
 * Standard API response object
 */
interface ApiResponse {
	data?: any;
	meta?: { [key: string]: any };
	errors?: string[];
	message?: string;
}

export default ApiResponse;
