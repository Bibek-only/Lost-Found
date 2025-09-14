import { Request, Response } from "express";
import { validENV } from "../schemas/envSchema";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse";

const googleAuthCallback = (req: Request, res: Response) => {
  try {
    // Check if user exists from passport authentication
    if (!req.user) {
      return res.redirect(
        `${validENV.FRONTEND_URL_DEV}/auth/error?message=Authentication failed`,
      );
    }

    const user = req.user as any;

    // Validate user data
    if (!user.id || !user.email) {
      return res.redirect(
        `${validENV.FRONTEND_URL_DEV}/auth/error?message=Invalid user data`,
      );
    }

    // Create JWT token with same structure as expected by authMiddleware
    const jwtToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
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
      sameSite: validENV.NODE_ENV === "production" ? "none" : "lax",
      secure: validENV.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      path: "/",
    });

    // Redirect to frontend success page
    res.redirect(`${validENV.FRONTEND_URL_DEV}/auth/success`);
  } catch (error) {
    console.error("Google auth callback error:", error);
    res.redirect(
      `${validENV.FRONTEND_URL_DEV}/auth/error?message=Authentication failed`,
    );
  }
};

export { googleAuthCallback };
