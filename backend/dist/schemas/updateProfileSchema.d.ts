import { z } from "zod";
declare const updateProfileSchema: z.ZodObject<{
    firstName: z.ZodString;
    middleName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    profileImage: z.ZodString;
    phoneNo: z.ZodString;
    campusRole: z.ZodString;
    branch: z.ZodString;
    academicYear: z.ZodString;
    section: z.ZodString;
    currentYear: z.ZodEnum<{
        FIRST: "FIRST";
        SECOND: "SECOND";
        THIRD: "THIRD";
        FOURTH: "FOURTH";
    }>;
    designation: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodString>;
    jobTitle: z.ZodOptional<z.ZodString>;
    staffDept: z.ZodOptional<z.ZodString>;
    other: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    district: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    pin: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export { updateProfileSchema };
