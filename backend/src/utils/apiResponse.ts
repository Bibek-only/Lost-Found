class ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  error: any;

  constructor(
    success: boolean = true,
    statusCode: number,
    message: string = "Success",
    data: any,
    error:any
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error
  }
}

export default ApiResponse;
