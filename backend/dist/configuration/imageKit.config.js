"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imagekit_1 = __importDefault(require("imagekit"));
const envSchema_1 = require("../schemas/envSchema");
const imagekit = new imagekit_1.default({
    publicKey: envSchema_1.validENV.IMAGE_KIT_PUBLIC_KEY,
    privateKey: envSchema_1.validENV.IMAGE_KIT_PRIVATEkEY,
    urlEndpoint: envSchema_1.validENV.IMAGE_KIT_URL_ENDPOINT,
});
exports.default = imagekit;
