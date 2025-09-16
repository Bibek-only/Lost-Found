"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const getUserInfo = async (req, res) => {
    try {
        const userRes = await prismaClient_1.default.user.findUnique({
            where: {
                id: req.userId,
                email: req.userEmail,
            },
            include: {}
        });
        if (!userRes) {
            throw new apiError_1.default(400, "Can'g get the user information");
        }
        else {
            return res
                .status(200)
                .json(new apiResponse_1.default(true, 200, "Successfully get the user ", userRes, null));
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
                .json(new apiResponse_1.default(false, 400, "Internal server error when update the user profile", null, null));
        }
    }
};
exports.getUserInfo = getUserInfo;
