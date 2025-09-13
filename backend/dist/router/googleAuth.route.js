"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const passport_config_1 = __importDefault(require("../configuration/passport.config"));
const googleAuthCallback_controller_1 = require("../controller/googleAuthCallback.controller");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.get(
// must hit through frontend to open the goolge login screen
"/google", passport_config_1.default.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get(
//after the loginwas done this end point was hit as call back url
"/google/callback", passport_config_1.default.authenticate("google", { session: false }), googleAuthCallback_controller_1.googleAuthCallback);
