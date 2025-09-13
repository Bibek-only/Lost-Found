"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthCallback = void 0;
const envSchema_1 = require("../schemas/envSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const googleAuthCallback = (req, res) => {
    // this is the end point of the google login
    const jwtToken = jsonwebtoken_1.default.sign({
        //create the cookie
        id: req.user.id,
        email: req.user.email,
    }, envSchema_1.validENV.JWT_SECRET, {
        expiresIn: "3d",
    });
    res.cookie("token", `Bearer ${jwtToken}`, {
        //set the cookie in the frontend
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        path: "/",
    });
    res.redirect(`${envSchema_1.validENV.FRONTEND_URL_DEV}/`); //after successfyll setthe cookie send the user to frontend url
};
exports.googleAuthCallback = googleAuthCallback;
