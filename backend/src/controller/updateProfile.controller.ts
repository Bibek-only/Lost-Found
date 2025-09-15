import prisma from "../db/prismaClient";
import { Request, Response } from "express";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import { updateProfileSchema } from "../schemas/updateProfileSchema";
const updateProfile = async (req: Request | any, res: Response | any) => {
  try {
    const validateData = updateProfileSchema.safeParse(req.body);
    if (validateData.success) {
      const updateRes = await prisma.user.update({
        where: {
          id: req.userId,
          email: req.userEmail,
        },
        data: validateData.data,
        select: {
          fullName: true,
          profileImage: true,
          email: true,
          phoneNo: true,
          isProfileCompleted: true,
          campusRole: true,
          branch: true,
          academicYear: true,
          section: true,
          currentYear: true,
          designation: true,
          department: true,
          jobTitle: true,
          staffDept: true,
          other: true,
          address: {
            select: {
              country: true,
              state: true,
              district: true,
              city: true,
              pin: true,
            },
          },
        },
      });
      if (updateRes) {
        return res
          .json(200)
          .json(
            new ApiResponse(
              true,
              200,
              "Successfully update the profile",
              updateRes,
              null,
            ),
          );
      } else {
        throw new ApiError(400, "User profile update fail");
      }
    } else {
      throw new ApiError(
        400,
        "Provided data was invalid",
        Object.entries(validateData.error.format()),
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
            "Internal server error when creating todo",
            null,
            null,
          ),
        );
    }
  }
};
