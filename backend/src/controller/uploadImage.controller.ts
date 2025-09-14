import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import imagekit from "../configuration/imageKit.config";
import { multerFileSchema } from "../schemas/multerFileSchema";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";

const imageUpload = async (req: Request, res: Response, next: NextFunction) => {
  let tempFilePath: string | null = null;

  try {
    // Check if files exist
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!files || !files.image || !files.image[0]) {
      throw new ApiError(
        400,
        "No image file provided. Please upload an image file.",
      );
    }

    const uploadedFile = files.image[0];
    tempFilePath = uploadedFile.path;

    // Validate file using Zod schema
    const validateFile = multerFileSchema.safeParse(uploadedFile);
    if (!validateFile.success) {
      const validationErrors = validateFile.error.issues.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code,
      }));

      throw new ApiError(400, "File validation failed", validationErrors);
    }

    // Check if file exists on disk
    if (!fs.existsSync(tempFilePath)) {
      throw new ApiError(
        500,
        "Uploaded file not found on server. Please try again.",
      );
    }

    // Read file buffer for ImageKit upload
    const fileBuffer = fs.readFileSync(tempFilePath);

    // Generate unique filename
    const fileExtension = path.extname(uploadedFile.originalname);
    const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2)}${fileExtension}`;

    // Upload to ImageKit
    const imageUploadRes = await imagekit.upload({
      file: fileBuffer,
      fileName: uniqueFileName,
      folder: "lost-and-found",
      useUniqueFileName: false, // We're handling unique names ourselves
    });

    if (!imageUploadRes || !imageUploadRes.url) {
      throw new ApiError(
        500,
        "Failed to upload image to cloud storage. Please try again.",
      );
    }

    // Clean up temp file after successful upload
    fs.unlinkSync(tempFilePath);
    tempFilePath = null; // Reset to avoid cleanup in finally block

    // Return success response
    return res.status(200).json(
      new ApiResponse(
        true,
        200,
        "Image uploaded successfully",
        {
          fileId: imageUploadRes.fileId,
          imageUrl: imageUploadRes.url,
          thumbnailUrl: imageUploadRes.thumbnailUrl,
          name: imageUploadRes.name,
          size: imageUploadRes.size,
          filePath: imageUploadRes.filePath,
          originalName: uploadedFile.originalname,
          mimeType: uploadedFile.mimetype,
          uploadedAt: new Date().toISOString(),
        },
        null,
      ),
    );
  } catch (error: any) {
    console.error("Image upload error:", error);

    // Handle different types of errors
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(
          new ApiResponse(
            false,
            error.statusCode,
            error.message,
            null,
            error.errors,
          ),
        );
    }

    // Handle ImageKit specific errors
    if (error.message && error.message.includes("ImageKit")) {
      return res
        .status(500)
        .json(
          new ApiResponse(false, 500, "Cloud storage upload failed", null, [
            { field: "imagekit", message: error.message },
          ]),
        );
    }

    // Handle file system errors
    if (error.code === "ENOENT") {
      return res.status(500).json(
        new ApiResponse(false, 500, "Uploaded file not found", null, [
          {
            field: "filesystem",
            message: "File was not saved properly during upload",
          },
        ]),
      );
    }

    if (error.code === "EACCES") {
      return res.status(500).json(
        new ApiResponse(false, 500, "File access denied", null, [
          {
            field: "filesystem",
            message: "Server lacks permission to process the file",
          },
        ]),
      );
    }

    // Generic error handling
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          500,
          "Internal server error during image upload",
          null,
          [{ field: "server", message: "An unexpected error occurred" }],
        ),
      );
  } finally {
    // Clean up temp file if it still exists
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
        console.log(`Cleaned up temp file: ${tempFilePath}`);
      } catch (cleanupError) {
        console.error(
          `Failed to cleanup temp file ${tempFilePath}:`,
          cleanupError,
        );
        // Don't throw error here as it would override the main error
      }
    }
  }
};

export default imageUpload;
