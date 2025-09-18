"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllListedItems = void 0;
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const getAllListedItems = async (req, res) => {
    try {
        const allListedItems = await prismaClient_1.default.listing.findMany({
            select: {
                title: true,
                description: true,
                keywords: true,
                listingType: true,
                status: true,
                landmark: true,
                lostOrFoundAt: true,
                images: {
                    select: {
                        imageUrl: true,
                    },
                },
                user: {
                    select: {
                        fullName: true,
                        profileImage: true,
                        email: true,
                        campusRole: true,
                        branch: true,
                        currentYear: true,
                        section: true,
                        staffDept: true,
                        other: true,
                        department: true,
                        designation: true,
                        jobTitle: true,
                    },
                },
            },
        });
        if (!allListedItems) {
            throw new apiError_1.default(400, "Unable to get the listing");
        }
        else {
            return res
                .status(200)
                .json(new apiResponse_1.default(true, 200, "Successfully get all the cookie", allListedItems, null));
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
                .json(new apiResponse_1.default(false, 400, "Internal server error when get all the listing error", null, null));
        }
    }
};
exports.getAllListedItems = getAllListedItems;
