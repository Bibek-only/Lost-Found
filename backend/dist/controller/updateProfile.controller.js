"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const updateProfileSchema_1 = require("../schemas/updateProfileSchema");
const updateProfile = async (req, res) => {
    try {
        const validateData = updateProfileSchema_1.updateProfileSchema.safeParse(req.body);
        if (validateData.success) {
            const updateRes = await prismaClient_1.default.user.update({
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
                    .json(new apiResponse_1.default(true, 200, "Successfully update the profile", updateRes, null));
            }
            else {
                throw new apiError_1.default(400, "User profile update fail");
            }
        }
        else {
            throw new apiError_1.default(400, "Provided data was invalid", Object.entries(validateData.error.format()));
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
