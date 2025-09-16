"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthStatus = void 0;
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const getAuthStatus = async (req, res) => {
    return res
        .status(200)
        .json(new apiResponse_1.default(true, 200, "User is authenticated", null, null));
};
exports.getAuthStatus = getAuthStatus;
