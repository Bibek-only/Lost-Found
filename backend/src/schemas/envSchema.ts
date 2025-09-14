import z from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  JWT_SECRET: z.string(),
  DATABASE_URL_DEV: z.string().trim().min(1),
  PORT: z.coerce.number(),
  GMAIL: z.string(),
  ADMIN_GMAIL: z.string(),
  APP_PASSWORD: z.string(),
  FRONTEND_URL_DEV: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL_DEV: z.string(),
});

export const validENV = envSchema.parse(process.env);
