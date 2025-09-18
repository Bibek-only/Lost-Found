import { z } from "zod";

const updateProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  middleName: z
    .string()
    .trim()
    .min(1, { message: "Enter a valid middleName" })
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Enter a valid last name" })
    .optional(),
  profileImage: z
    .string()
    .trim()
    .min(1, { message: "Profile image is required" }),
  phoneNo: z.string().length(10, { message: "Enter a valid phone number" }),
  campusRole: z.string().min(1, { message: "Enter a valid compus role" }),

  branch: z.string().min(1, { message: "Enter a valid branch name." }),
  academicYear: z.string().min(1, { message: "Enter a valid academic Year" }),
  section: z.string().length(1, { message: "Enter a valid section" }),
  currentYear: z.enum(["FIRST", "SECOND", "THIRD", "FOURTH"]),
  designation: z
    .string()
    .trim()
    .min(1, { message: "Enter a valid designation" })
    .optional(),
  department: z
    .string()
    .trim()
    .min(1, { message: "Enter a valid deparment" })
    .optional(),
  jobTitle: z
    .string()
    .trim()
    .min(1, { message: "Enter a valid job title" })
    .optional(),
  staffDept: z
    .string()
    .trim()
    .min(1, { message: "Enter a valid department name" })
    .optional(),
  other: z
    .string()
    .trim()
    .min(1, { message: "Enter your valid role in compus" })
    .optional(),
  country: z
    .string()
    .trim()
    .min(1, { message: "Enter a valid country" })
    .optional(),
  state: z
    .string()
    .trim()
    .min(1, { message: "Enter a valid country name" })
    .optional(),
  district: z
    .string()
    .trim()
    .min(1, { message: "Enter a valid district name" })
    .optional(),
  city: z.string().trim().min(1, { message: "Enter a valid city name" }),
  pin: z
    .string()
    .trim()
    .min(1, { message: "Enter a valid pin number" })
    .optional(),
});

export { updateProfileSchema };
