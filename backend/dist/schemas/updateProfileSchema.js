"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
const updateProfileSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: "First name is required." }),
    middleName: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Enter a valid middleName" })
        .optional(),
    lastName: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Enter a valid last name" })
        .optional(),
    profileImage: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Profile image is required" }),
    phoneNo: zod_1.z.string().length(10, { message: "Enter a valid phone number" }),
    campusRole: zod_1.z.string().min(1, { message: "Enter a valid compus role" }),
    branch: zod_1.z.string().min(1, { message: "Enter a valid branch name." }),
    academicYear: zod_1.z.string().min(1, { message: "Enter a valid academic Year" }),
    section: zod_1.z.string().length(1, { message: "Enter a valid section" }),
    currentYear: zod_1.z.enum(["FIRST", "SECOND", "THIRD", "FOURTH"]),
    designation: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Enter a valid designation" })
        .optional(),
    department: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Enter a valid deparment" })
        .optional(),
    jobTitle: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Enter a valid job title" })
        .optional(),
    staffDept: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Enter a valid department name" })
        .optional(),
    other: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Enter your valid role in compus" })
        .optional(),
    country: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Enter a valid country" })
        .optional(),
    state: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Enter a valid country name" })
        .optional(),
    district: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Enter a valid district name" })
        .optional(),
    city: zod_1.z.string().trim().min(1, { message: "Enter a valid city name" }),
    pin: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Enter a valid pin number" })
        .optional(),
});
exports.updateProfileSchema = updateProfileSchema;
