import { z } from "zod";

export const multerFileSchema = z.object({
  fieldname: z.string(), // Name of the field in the form-data
  originalname: z.string().min(1, "Original filename is required"), // Original name of the uploaded file
  encoding: z.string(), // Encoding type
  mimetype: z.enum(
    [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ],
    {
      message:
        "Invalid file type. Only JPEG, PNG, GIF, BMP, and WebP images are allowed",
    },
  ), // Allowed MIME types
  size: z.number().max(5 * 1024 * 1024, {
    message: "File size must be less than or equal to 5MB",
  }), // Size limit (5MB)
  path: z.string().min(1, "File path is required"), // Path to the stored file
});
