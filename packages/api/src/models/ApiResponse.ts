export interface ErrorItem {
	message: string;
}

export interface ApiResponse<T> {
	data: T;
	errors: ErrorItem[];
	message?: string;
}
