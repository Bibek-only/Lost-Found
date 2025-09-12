"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const express_1 = require("express");
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const healthRouter = (0, express_1.Router)();
exports.healthRouter = healthRouter;
healthRouter.route("/").get((req, res) => {
    return res
        .status(200)
        .json(new apiResponse_1.default(true, 200, "Everything is working fine", null, null));
});
