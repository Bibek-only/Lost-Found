"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const envSchema_1 = require("../schemas/envSchema");
const authMiddleware = async (req, res, next) => {
    try {
        // Check if token exists in cookies
        const token = req.cookies?.token;
        if (!token) {
            throw new apiError_1.default(401, "Authentication required. Please login to access this resource.", [
                {
                    field: "token",
                    message: "No authentication token found in cookies",
                },
            ]);
        }
        // Extract Bearer token
        if (!token.startsWith("Bearer ")) {
            throw new apiError_1.default(401, "Invalid token format. Expected Bearer token.", [
                { field: "token", message: "Token must be in 'Bearer <token>' format" },
            ]);
        }
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new apiError_1.default(401, "Authentication token is malformed.", [
                { field: "token", message: "Bearer token is empty or invalid" },
            ]);
        }
        // Verify JWT token
        let decodedToken;
        try {
            decodedToken = jsonwebtoken_1.default.verify(bearerToken, envSchema_1.validENV.JWT_SECRET);
        }
        catch (jwtError) {
            if (jwtError.name === "TokenExpiredError") {
                throw new apiError_1.default(401, "Authentication token has expired. Please login again.", [
                    {
                        field: "token",
                        message: "JWT token expired",
                        expiredAt: jwtError.expiredAt,
                    },
                ]);
            }
            else if (jwtError.name === "JsonWebTokenError") {
                throw new apiError_1.default(401, "Invalid authentication token. Please login again.", [{ field: "token", message: "JWT token is malformed or invalid" }]);
            }
            else if (jwtError.name === "NotBeforeError") {
                throw new apiError_1.default(401, "Authentication token is not active yet.", [
                    { field: "token", message: "JWT token not before error" },
                ]);
            }
            else {
                throw new apiError_1.default(401, "Token verification failed.", [
                    { field: "token", message: jwtError.message },
                ]);
            }
        }
        // Validate token payload
        if (!decodedToken.id || !decodedToken.email) {
            throw new apiError_1.default(401, "Authentication token is missing required user information.", [
                {
                    field: "token",
                    message: "Token payload missing user ID or email",
                    payload: {
                        hasId: !!decodedToken.id,
                        hasEmail: !!decodedToken.email,
                    },
                },
            ]);
        }
        // Verify user exists in database
        const user = await prismaClient_1.default.user.findUnique({
            where: {
                id: decodedToken.id,
                email: decodedToken.email,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                userType: true,
                campusRole: true,
                profileImage: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new apiError_1.default(401, "User not found or account has been deactivated.", [
                {
                    field: "user",
                    message: "No user found with the provided token credentials",
                    userId: decodedToken.id,
                },
            ]);
        }
        // Attach user information to request object
        req.userId = user.id;
        req.userEmail = user.email;
        req.user = user;
        // Continue to next middleware/controller
        next();
    }
    catch (error) {
        console.error("Authentication middleware error:", error);
        // Handle custom ApiError
        if (error instanceof apiError_1.default) {
            return res
                .status(error.statusCode)
                .json(new apiResponse_1.default(false, error.statusCode, error.message, null, error.errors));
        }
        // Handle Prisma database errors
        if (error.code === "P2025") {
            return res
                .status(401)
                .json(new apiResponse_1.default(false, 401, "User not found in database", null, [
                { field: "database", message: "User record not found" },
            ]));
        }
        // Handle database connection errors
        if (error.name === "PrismaClientKnownRequestError") {
            return res.status(500).json(new apiResponse_1.default(false, 500, "Database error during authentication", null, [
                {
                    field: "database",
                    message: "Failed to verify user credentials",
                },
            ]));
        }
        // Generic error fallback
        return res
            .status(500)
            .json(new apiResponse_1.default(false, 500, "Internal server error during authentication", null, [{ field: "server", message: "An unexpected error occurred" }]));
    }
};
exports.default = authMiddleware;
