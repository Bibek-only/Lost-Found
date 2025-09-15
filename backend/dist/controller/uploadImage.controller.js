"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const imageKit_config_1 = __importDefault(require("../configuration/imageKit.config"));
const multerFileSchema_1 = require("../schemas/multerFileSchema");
const apiError_1 = __importDefault(require("../utils/apiError"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const imageUpload = async (req, res, next) => {
    let tempFilePath = null;
    try {
        // Check if files exist
        const files = req.files;
        if (!files || !files.image || !files.image[0]) {
            throw new apiError_1.default(400, "No image file provided. Please upload an image file.");
        }
        const uploadedFile = files.image[0];
        tempFilePath = uploadedFile.path;
        // Validate file using Zod schema
        const validateFile = multerFileSchema_1.multerFileSchema.safeParse(uploadedFile);
        if (!validateFile.success) {
            const validationErrors = validateFile.error.issues.map((err) => ({
                field: err.path.join("."),
                message: err.message,
                code: err.code,
            }));
            throw new apiError_1.default(400, "File validation failed", validationErrors);
        }
        // Check if file exists on disk
        if (!fs_1.default.existsSync(tempFilePath)) {
            throw new apiError_1.default(500, "Uploaded file not found on server. Please try again.");
        }
        // Read file buffer for ImageKit upload
        const fileBuffer = fs_1.default.readFileSync(tempFilePath);
        // Generate unique filename
        const fileExtension = path_1.default.extname(uploadedFile.originalname);
        const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2)}${fileExtension}`;
        // Upload to ImageKit
        const imageUploadRes = await imageKit_config_1.default.upload({
            file: fileBuffer,
            fileName: uniqueFileName,
            folder: "lost-and-found",
            useUniqueFileName: false, // We're handling unique names ourselves
        });
        if (!imageUploadRes || !imageUploadRes.url) {
            throw new apiError_1.default(500, "Failed to upload image to cloud storage. Please try again.");
        }
        // Clean up temp file after successful upload
        fs_1.default.unlinkSync(tempFilePath);
        tempFilePath = null; // Reset to avoid cleanup in finally block
        // Return success response
        return res.status(200).json(new apiResponse_1.default(true, 200, "Image uploaded successfully", {
            fileId: imageUploadRes.fileId,
            imageUrl: imageUploadRes.url,
            uploadedAt: new Date().toISOString(),
        }, null));
    }
    catch (error) {
        console.error("Image upload error:", error);
        // Handle different types of errors
        if (error instanceof apiError_1.default) {
            return res
                .status(error.statusCode)
                .json(new apiResponse_1.default(false, error.statusCode, error.message, null, error.errors));
        }
        // Handle ImageKit specific errors
        if (error.message && error.message.includes("ImageKit")) {
            return res
                .status(500)
                .json(new apiResponse_1.default(false, 500, "Cloud storage upload failed", null, [
                { field: "imagekit", message: error.message },
            ]));
        }
        // Handle file system errors
        if (error.code === "ENOENT") {
            return res.status(500).json(new apiResponse_1.default(false, 500, "Uploaded file not found", null, [
                {
                    field: "filesystem",
                    message: "File was not saved properly during upload",
                },
            ]));
        }
        if (error.code === "EACCES") {
            return res.status(500).json(new apiResponse_1.default(false, 500, "File access denied", null, [
                {
                    field: "filesystem",
                    message: "Server lacks permission to process the file",
                },
            ]));
        }
        // Generic error handling
        return res
            .status(500)
            .json(new apiResponse_1.default(false, 500, "Internal server error during image upload", null, [{ field: "server", message: "An unexpected error occurred" }]));
    }
    finally {
        // Clean up temp file if it still exists
        if (tempFilePath && fs_1.default.existsSync(tempFilePath)) {
            try {
                fs_1.default.unlinkSync(tempFilePath);
                console.log(`Cleaned up temp file: ${tempFilePath}`);
            }
            catch (cleanupError) {
                console.error(`Failed to cleanup temp file ${tempFilePath}:`, cleanupError);
                // Don't throw error here as it would override the main error
            }
        }
    }
};
exports.default = imageUpload;
