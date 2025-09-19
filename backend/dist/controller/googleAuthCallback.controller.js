"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthCallback = void 0;
const envSchema_1 = require("../schemas/envSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const googleAuthCallback = (req, res) => {
  try {
    // Check if user exists from passport authentication
    if (!req.user) {
      return res.redirect(
        `${envSchema_1.validENV.FRONTEND_URL}/auth/error?message=Authentication failed`,
      );
    }
    const user = req.user;
    // Validate user data
    if (!user.id || !user.email) {
      return res.redirect(
        `${envSchema_1.validENV.FRONTEND_URL}/auth/error?message=Invalid user data`,
      );
    }
    // Create JWT token with same structure as expected by authMiddleware
    const jwtToken = jsonwebtoken_1.default.sign(
      {
        id: user.id,
        email: user.email,
      },
      envSchema_1.validENV.JWT_SECRET,
      {
        expiresIn: "3d",
        issuer: "lost-found-app",
        audience: "lost-found-users",
      },
    );
    // Set secure cookie
    res.cookie("token", `Bearer ${jwtToken}`, {
      httpOnly: true,
      sameSite: envSchema_1.validENV.NODE_ENV === "production" ? "none" : "lax",
      secure: envSchema_1.validENV.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      path: "/",
    });
    // Redirect to frontend success page
    res.redirect(`${envSchema_1.validENV.FRONTEND_URL}/`);
  } catch (error) {
    console.error("Google auth callback error:", error);
    res.redirect(
      `${envSchema_1.validENV.FRONTEND_URL}/auth/error?message=Authentication failed`,
    );
  }
};
exports.googleAuthCallback = googleAuthCallback;
