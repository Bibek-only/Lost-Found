declare class ApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: any;
    error: any;
    constructor(success: boolean, statusCode: number, message: string, data: any, error: any);
}
export default ApiResponse;
