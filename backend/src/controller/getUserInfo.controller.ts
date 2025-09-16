import prisma from "../db/prismaClient";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import { Request, Response } from "express";

export const getUserInfo = async (req: Request | any, res: Response | any) => {
  try {
    const userRes = await prisma.user.findUnique({
      where: {
        id: req.userId,
        email: req.userEmail,
      },
      include:{
        
      }
      
    });
    if (!userRes) {
      throw new ApiError(400, "Can'g get the user information");
    } else {
      return res
        .status(200)
        .json(
          new ApiResponse(
            true,
            200,
            "Successfully get the user ",
            userRes,
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
            "Internal server error when update the user profile",
            null,
            null,
          ),
        );
    }
  }
};
