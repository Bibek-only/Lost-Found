"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const updateProfile_controller_1 = require("../controller/updateProfile.controller");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.route("/update-profile").post(authMiddleware_1.default, updateProfile_controller_1.updateProfile);
