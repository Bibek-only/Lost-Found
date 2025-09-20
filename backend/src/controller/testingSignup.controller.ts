import prisma from "../db/prismaClient";
import { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { validENV } from "../schemas/envSchema";

import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";

const signupSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  profileImage: z.string(),
});

const testSignin = async (req: Request | any, res: Response | any) => {
  try {
    const validateData = signupSchema.safeParse(req.body);
    if (validateData.success) {
      //check user is exist or not
      const userRes = await prisma.user.upsert({
        where: {
          email: validateData.data.email,
        },
        update: {},
        create: {
          fullName: validateData.data.fullName,
          email: validateData.data.email,
          profileImage: validateData.data.fullName,
        },
        select: {
          id: true,
          email: true,
        },
      });
      if (userRes) {
        const jwtToken = jwt.sign(
          {
            id: userRes.id,
            email: userRes.email,
          },
          validENV.JWT_SECRET,
          {
            expiresIn: "3d",
            issuer: "lost-found-app",
            audience: "lost-found-users",
          },
        );
        // Set secure cookie
        res.cookie("token", `Bearer ${jwtToken}`, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
          path: "/",
        });

        return res
          .status(200)
          .json(
            new ApiResponse(
              true,
              200,
              "Successfully created the user",
              null,
              null,
            ),
          );
      } else {
        throw new ApiError(400, "Can't crate the user for testing");
      }
    } else {
      throw new ApiError(
        400,
        "Provided data is invalid",
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

export { testSignin };
