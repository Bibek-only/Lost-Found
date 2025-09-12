"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validENV = void 0;
const zod_1 = __importDefault(require("zod"));
const envSchema = zod_1.default.object({
    PORT: zod_1.default.coerce.number(),
    NODE_ENV: zod_1.default
        .enum(['development', 'production', 'test'])
        .default('development'),
    DATABASE_URL_DEV: zod_1.default.string().trim().min(1),
});
exports.validENV = envSchema.parse(process.env);
