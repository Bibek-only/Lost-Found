"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerFileSchema = void 0;
const zod_1 = require("zod");
exports.multerFileSchema = zod_1.z.object({
    fieldname: zod_1.z.string(), // Name of the field in the form-data
    originalname: zod_1.z.string().min(1, "Original filename is required"), // Original name of the uploaded file
    encoding: zod_1.z.string(), // Encoding type
    mimetype: zod_1.z.enum([
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
    ], {
        message: "Invalid file type. Only JPEG, PNG, GIF, BMP, and WebP images are allowed",
    }), // Allowed MIME types
    size: zod_1.z.number().max(5 * 1024 * 1024, {
        message: "File size must be less than or equal to 5MB",
    }), // Size limit (5MB)
    path: zod_1.z.string().min(1, "File path is required"), // Path to the stored file
});
