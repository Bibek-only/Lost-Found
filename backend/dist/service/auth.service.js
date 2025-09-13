"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateUser = findOrCreateUser;
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
async function findOrCreateUser(profile) {
    try {
        let user = await prismaClient_1.default.user.findUnique({
            where: { email: profile.emails?.[0]?.value },
        });
        if (!user) {
            user = await prismaClient_1.default.user.create({
                data: {
                    fullName: profile.displayName,
                    email: profile.emails?.[0]?.value,
                    profileImage: profile.photos?.[0]?.value,
                },
            });
        }
        return user;
    }
    catch (error) {
        console.log("Error occured in the auth.service.ts", error);
        return undefined;
    }
}
