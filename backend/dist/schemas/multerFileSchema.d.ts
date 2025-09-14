import { z } from "zod";
export declare const multerFileSchema: z.ZodObject<{
    fieldname: z.ZodString;
    originalname: z.ZodString;
    encoding: z.ZodString;
    mimetype: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/jpg": "image/jpg";
        "image/png": "image/png";
        "image/gif": "image/gif";
        "image/bmp": "image/bmp";
        "image/webp": "image/webp";
    }>;
    size: z.ZodNumber;
    path: z.ZodString;
}, z.core.$strip>;
