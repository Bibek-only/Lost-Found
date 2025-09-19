"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const envSchema_1 = require("./schemas/envSchema");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_config_1 = __importDefault(
  require("./configuration/passport.config"),
);
const healthRouter_1 = require("./router/healthRouter");
const googleAuth_route_1 = require("./router/googleAuth.route");
const apiError_1 = __importDefault(require("./utils/apiError"));
const apiResponse_1 = __importDefault(require("./utils/apiResponse"));
const imageUplodRouter_1 = require("./router/imageUplodRouter");
const testing_route_1 = require("./router/testing.route");
const user_router_1 = require("./router/user.router");
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json()); //middleware to parse/access the body
app.use(express_1.default.urlencoded({ extended: true }));
app.use(
  (0, cors_1.default)({
    origin: [envSchema_1.validENV.FRONTEND_URL],
    credentials: true,
  }),
);
app.use(passport_config_1.default.initialize());
app.use((0, cookie_parser_1.default)()); //to configure the cokkie
//rotuer configuration
app.use("/api/v1/health", healthRouter_1.healthRouter);
//auth router configuraton
app.use("/api/v1/user/auth", googleAuth_route_1.authRouter);
// image upload router configuration
app.use("/api/v1/user/image", imageUplodRouter_1.imageRouter);
//configured the testing route
app.use("/api/v1/user/auth/testing", testing_route_1.testingRouter);
//user router configuration
app.use("/api/v1/user", user_router_1.userRouter);
// A test router to test functionality of function in temporary bases
app.get("/test", async (req, res) => {
  res.send("mail send");
});
// Global error handler
app.use((err, req, res, next) => {
  if (err instanceof apiError_1.default) {
    return res
      .status(err.statusCode)
      .json(
        new apiResponse_1.default(
          false,
          err.statusCode,
          err.message,
          null,
          err.errors,
        ),
      );
  }
  console.error("Unhandled error:", err);
  return res
    .status(500)
    .json(
      new apiResponse_1.default(
        false,
        500,
        "Internal server error",
        null,
        null,
      ),
    );
});
// 404 handler
app.use((req, res) => {
  res
    .status(404)
    .json(new apiResponse_1.default(false, 404, "Route not found", null, null));
});
exports.default = app;
