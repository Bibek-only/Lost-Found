"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.portalEntry = void 0;
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const portalEntry_schema_1 = require("../schemas/portalEntry.schema");
const apiError_1 = __importDefault(require("../utils/apiError"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const findMatches_1 = require("../helper/findMatches");
const portalEntry = async (req, res) => {
    try {
        const validData = portalEntry_schema_1.portalEntrySchema.safeParse(req.body);
        if (validData.success) {
            //create an transaction
            const portalEntry = await prismaClient_1.default.$transaction(async (tx) => {
                const portalEntryRes = await tx.listing.create({
                    data: {
                        userId: req.userId,
                        title: validData.data.title,
                        description: validData.data.description,
                        keywords: validData.data.keywords,
                        listingType: validData.data.listingType,
                        landmark: validData.data.landmark,
                        lostOrFoundAt: validData.data.lostOrFoundAt
                            ? new Date(validData.data.lostOrFoundAt)
                            : new Date(),
                    },
                });
                // Create images after listing exists
                const imagesEntryRes = await tx.itemImage.createMany({
                    data: validData.data.imageUrls.map((url, idx) => ({
                        imageUrl: url,
                        fileId: validData.data.fileIds[idx],
                        listingId: portalEntryRes.id, // existing listing
                    })),
                });
                await (0, findMatches_1.findMatches)(portalEntryRes, tx);
            });
            return res
                .status(200)
                .json(new apiResponse_1.default(true, 200, "Successfully done the portal Entrye", null, null));
        }
        else {
            throw new apiError_1.default(400, "Provided data is not valid", Object.entries(validData.error.format()));
        }
    }
    catch (error) {
        console.log(error);
        if (error instanceof apiError_1.default) {
            return res
                .status(error.statusCode)
                .json(new apiResponse_1.default(false, error.statusCode, error.message, null, error.errors));
        }
        else {
            return res
                .status(400)
                .json(new apiResponse_1.default(false, 400, "Internal server error when do the portal entry", null, null));
        }
    }
};
exports.portalEntry = portalEntry;
