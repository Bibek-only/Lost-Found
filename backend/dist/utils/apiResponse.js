"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    success;
    statusCode;
    message;
    data;
    error;
    constructor(success = true, statusCode, message = "Success", data, error) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}
exports.default = ApiResponse;
