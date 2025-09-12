"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const healthRouter_1 = require("./router/healthRouter");
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json()); //middleware to parse/access the body
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"]
}));
//rotuer configuration
app.use("/health", healthRouter_1.healthRouter);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        msg: "Everthing is fine and the site is working successfully"
    });
});
exports.default = app;
