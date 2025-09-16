"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portalEntrySchema = void 0;
const zod_1 = require("zod");
const portalEntrySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Enter a valid title" }),
    description: zod_1.z.string().min(1, { message: "Enter a valid description" }),
    keywords: zod_1.z.array(zod_1.z.string()),
    listingType: zod_1.z.enum(["LOST", "FOUND"]),
    landmark: zod_1.z.string().trim().optional(),
    lostOrFoundAt: zod_1.z.coerce.date().optional(),
    imageUrls: zod_1.z.array(zod_1.z.string()),
    fileIds: zod_1.z.array(zod_1.z.string())
});
exports.portalEntrySchema = portalEntrySchema;
