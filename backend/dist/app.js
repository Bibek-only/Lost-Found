"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_config_1 = __importDefault(require("./configuration/passport.config"));
const healthRouter_1 = require("./router/healthRouter");
const googleAuth_route_1 = require("./router/googleAuth.route");
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json()); //middleware to parse/access the body
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
}));
app.use(passport_config_1.default.initialize());
app.use((0, cookie_parser_1.default)()); //to configure the cokkie
//rotuer configuration
app.use("/api/v1/health", healthRouter_1.healthRouter);
//auth router configuraton
app.use("/api/v1/user/auth", googleAuth_route_1.authRouter);
exports.default = app;
