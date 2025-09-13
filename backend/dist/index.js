"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const envSchema_1 = require("./schemas/envSchema");
app_js_1.default.listen(envSchema_1.validENV.PORT || 3001, () => {
    console.log(`App is serving at port ${process.env.PORT}, http://localhost:${envSchema_1.validENV.PORT || 3001}/api/v1/health`);
});
