import prisma from "../db/prismaClient";
import { portalEntrySchema } from "../schemas/portalEntry.schema";
import { Request,Response } from "express";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";

const portalEntry = async (req: Request | any, res: Response | any) => {
  try {
    const validData = portalEntrySchema.safeParse(req.body);
    if (validData.success) {
      //create an transaction
      const portalEntry = await prisma.$transaction(async (tx) => {
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
          select: {
            id: true,
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
      });
      return res
        .status(200)
        .json(
          new ApiResponse(
            true,
            200,
            "Successfully done the portal Entrye",
            null,
            null,
          ),
        );
    } else {
      throw new ApiError(
        400,
        "Provided data is not valid",
        Object.entries(validData.error.format()),
      );
    }
  } catch (error: any) {
    console.log(error)
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
    } else {
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            400,
            "Internal server error when do the portal entry",
            null,
            null,
          ),
        );
    }
  }
};

export {portalEntry}
