import prisma from "../db/prismaClient";
import { Request, Response } from "express";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";

export const getAllListedItems = async (
  req: Request | any,
  res: Response | any,
) => {
  try {
    const allListedItems = await prisma.listing.findMany({
      select: {
        title: true,
        description: true,
        keywords: true,
        listingType: true,
        status: true,
        landmark: true,
        lostOrFoundAt: true,

        images: {
          select: {
            imageUrl: true,
          },
        },
        user: {
          select: {
            fullName: true,
            profileImage: true,
            email: true,
            campusRole: true,
            branch: true,
            currentYear: true,
            section: true,
            staffDept: true,
            other: true,
            department: true,
            designation: true,
            jobTitle: true,
          },
        },
      },
    });
    if (!allListedItems) {
      throw new ApiError(400, "Unable to get the listing");
    } else {
      return res
        .status(200)
        .json(
          new ApiResponse(
            true,
            200,
            "Successfully get all the cookie",
            allListedItems,
            null,
          ),
        );
    }
  } catch (error: any) {
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
            "Internal server error when get all the listing error",
            null,
            null,
          ),
        );
    }
  }
};
