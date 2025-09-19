import { z } from "zod";

// Frontend schema matching backend portalEntry.schema.ts
export const portalEntrySchema = z.object({
  title: z.string().min(1, { message: "Enter a valid title" }),
  description: z.string().min(1, { message: "Enter a valid description" }),
  keywords: z.array(z.string()),
  listingType: z.enum(["LOST", "FOUND"]),
  landmark: z.string().trim().optional(),
  lostOrFoundAt: z.coerce.date().optional(),
  imageUrls: z.array(z.string()),
  fileIds: z.array(z.string()),
});

export type PortalEntryFormData = z.infer<typeof portalEntrySchema>;
