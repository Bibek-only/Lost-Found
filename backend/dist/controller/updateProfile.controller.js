"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const updateProfileSchema_1 = require("../schemas/updateProfileSchema");
const updateProfile = async (req, res) => {
    try {
        const validateData = updateProfileSchema_1.updateProfileSchema.safeParse(req.body);
        if (validateData.success) {
            const transactionRes = await prismaClient_1.default.$transaction(async (tx) => {
                const userUpdateRes = await tx.user.update({
                    where: {
                        id: req.userId,
                        email: req.userEmail,
                    },
                    data: {
                        fullName: `${validateData.data.firstName} ${validateData.data.middleName || ""} ${validateData.data.lastName || ""}`,
                        profileImage: validateData.data.profileImage,
                        phoneNo: validateData.data.phoneNo,
                        isProfileCompleted: true,
                        campusRole: validateData.data.campusRole,
                        branch: validateData.data.branch,
                        academicYear: validateData.data.academicYear,
                        section: validateData.data.section,
                        currentYear: validateData.data.currentYear,
                        designation: validateData.data.designation,
                        department: validateData.data.department,
                        jobTitle: validateData.data.jobTitle,
                        staffDept: validateData.data.staffDept,
                        other: validateData.data.other,
                    },
                    select: {
                        id: true,
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
                    },
                });
                let addressUpdateRes = null;
                const isAddressPresent = await tx.address.findUnique({
                    where: {
                        userId: userUpdateRes.id,
                    },
                });
                if (isAddressPresent) {
                    addressUpdateRes = await tx.address.update({
                        where: {
                            userId: userUpdateRes.id,
                        },
                        data: {
                            country: validateData.data.country,
                            state: validateData.data.state,
                            district: validateData.data.district,
                            city: validateData.data.city,
                            pin: validateData.data.pin,
                        },
                        select: {
                            id: false,
                            country: true,
                            state: true,
                            district: true,
                            city: true,
                            pin: true,
                        },
                    });
                }
                else {
                    addressUpdateRes = await tx.address.create({
                        data: {
                            userId: userUpdateRes.id,
                            country: validateData.data.country,
                            state: validateData.data.state,
                            district: validateData.data.district,
                            city: validateData.data.city,
                            pin: validateData.data.pin,
                        },
                        select: {
                            country: true,
                            state: true,
                            district: true,
                            city: true,
                            pin: true,
                        },
                    });
                }
                return { userUpdateRes, addressUpdateRes };
            });
            return res.status(200).json(new apiResponse_1.default(true, 200, "Successfully update the profile", {
                ...transactionRes.userUpdateRes,
                ...transactionRes.addressUpdateRes,
            }, null));
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
                .json(new apiResponse_1.default(false, 400, "Internal server error when update the user profile", null, null));
        }
    }
};
exports.updateProfile = updateProfile;
