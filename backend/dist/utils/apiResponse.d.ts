declare class ApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: any;
    error: any;
    constructor(success: boolean | undefined, statusCode: number, message: string | undefined, data: any, error: any);
}
export default ApiResponse;
