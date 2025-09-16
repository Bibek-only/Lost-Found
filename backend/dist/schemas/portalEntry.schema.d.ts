import { z } from "zod";
declare const portalEntrySchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    keywords: z.ZodArray<z.ZodString>;
    listingType: z.ZodEnum<{
        LOST: "LOST";
        FOUND: "FOUND";
    }>;
    landmark: z.ZodOptional<z.ZodString>;
    lostOrFoundAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    imageUrls: z.ZodArray<z.ZodString>;
    fileIds: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export { portalEntrySchema };
