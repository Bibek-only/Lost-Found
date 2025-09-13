"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validENV = void 0;
const zod_1 = __importDefault(require("zod"));
const envSchema = zod_1.default.object({
    NODE_ENV: zod_1.default
        .enum(["development", "production", "test"])
        .default("development"),
    JWT_SECRET: zod_1.default.string(),
    DATABASE_URL_DEV: zod_1.default.string().trim().min(1),
    PORT: zod_1.default.coerce.number(),
    GMAIL: zod_1.default.string(),
    ADMIN_GMAIL: zod_1.default.string(),
    APP_PASSWORD: zod_1.default.string(),
    FRONTEND_URL_DEV: zod_1.default.string(),
    GOOGLE_CLIENT_ID: zod_1.default.string(),
    GOOGLE_CLIENT_SECREATE: zod_1.default.string(),
    GOOGLE_CALLBACK_URL_DEV: zod_1.default.string(),
});
exports.validENV = envSchema.parse(process.env);
