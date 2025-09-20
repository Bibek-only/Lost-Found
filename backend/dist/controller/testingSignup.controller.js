"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSignin = void 0;
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envSchema_1 = require("../schemas/envSchema");
const apiError_1 = __importDefault(require("../utils/apiError"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const signupSchema = zod_1.z.object({
    fullName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    profileImage: zod_1.z.string(),
});
const testSignin = async (req, res) => {
    try {
        const validateData = signupSchema.safeParse(req.body);
        if (validateData.success) {
            //check user is exist or not
            const userRes = await prismaClient_1.default.user.upsert({
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
                const jwtToken = jsonwebtoken_1.default.sign({
                    id: userRes.id,
                    email: userRes.email,
                }, envSchema_1.validENV.JWT_SECRET, {
                    expiresIn: "3d",
                    issuer: "lost-found-app",
                    audience: "lost-found-users",
                });
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
                    .json(new apiResponse_1.default(true, 200, "Successfully created the user", null, null));
            }
            else {
                throw new apiError_1.default(400, "Can't crate the user for testing");
            }
        }
        else {
            throw new apiError_1.default(400, "Provided data is invalid", Object.entries(validateData.error.format()));
        }
    }
    catch (error) {
        if (error instanceof apiError_1.default) {
            return res
                .status(error.statusCode)
                .json(new apiResponse_1.default(false, error.statusCode, error.message, null, error.errors));
        }
        else {
            return res
                .status(400)
                .json(new apiResponse_1.default(false, 400, "Internal server error when creating todo", null, null));
        }
    }
};
exports.testSignin = testSignin;
