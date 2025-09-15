"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const testingSignup_controller_1 = require("../controller/testingSignup.controller");
const testingRouter = (0, express_1.Router)();
exports.testingRouter = testingRouter;
testingRouter.route("/signin").post(testingSignup_controller_1.testSignin);
