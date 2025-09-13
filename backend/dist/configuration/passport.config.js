"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envSchema_1 = require("../schemas/envSchema");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const auth_service_1 = require("../service/auth.service");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: envSchema_1.validENV.GOOGLE_CLIENT_ID,
    clientSecret: envSchema_1.validENV.GOOGLE_CLIENT_SECREATE,
    callbackURL: envSchema_1.validENV.GOOGLE_CALLBACK_URL_DEV, // this callback url is the exact url given in the google console it need to hited after successful loging
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await (0, auth_service_1.findOrCreateUser)(profile); // this will hit after the goolgle login screen was open and by selecting an google account
        if (user) {
            return done(null, user);
        }
        else {
            return done(Error, undefined);
        }
    }
    catch (error) {
        return done(error, undefined);
    }
}));
exports.default = passport_1.default;
