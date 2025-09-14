"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const express_1 = require("express");
const uploadImage_controller_js_1 = __importDefault(require("../controller/uploadImage.controller.js"));
const authMiddleware_js_1 = __importDefault(require("../middleware/authMiddleware.js"));
const multer_js_1 = __importDefault(require("../middleware/multer.js"));
const imageRouter = (0, express_1.Router)();
exports.imageRouter = imageRouter;
imageRouter.route("/upload").post(authMiddleware_js_1.default, multer_js_1.default.fields([
    {
        name: "image",
        maxCount: 1,
    },
]), uploadImage_controller_js_1.default);
