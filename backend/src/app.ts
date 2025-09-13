import "dotenv/config";
import { validENV } from "./schemas/envSchema";
import express,{Request,Response,NextFunction} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./configuration/passport.config";
import { healthRouter } from "./router/healthRouter";
import { authRouter } from "./router/googleAuth.route";
import ApiError from "./utils/apiError";
import ApiResponse from "./utils/apiResponse";
const app = express();

//middlewares
app.use(express.json()); //middleware to parse/access the body
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [validENV.FRONTEND_URL_DEV],
    credentials: true,
  }),
);
app.use(passport.initialize());
app.use(cookieParser()); //to configure the cokkie

//rotuer configuration
app.use("/api/v1/health", healthRouter);

//auth router configuraton
app.use("/api/v1/user/auth", authRouter);

// Global error handler
app.use(
  (
    err: any,
    req: Request | any,
    res: Response | any,
    next: NextFunction,
  ) => {
    if (err instanceof ApiError) {
      return res
        .status(err.statusCode)
        .json(
          new ApiResponse(false, err.statusCode, err.message, null, err.errors),
        );
    }

    console.error("Unhandled error:", err);
    return res
      .status(500)
      .json(new ApiResponse(false, 500, "Internal server error", null, null));
  },
);

// 404 handler
app.use((req:Request | any, res:Response | any) => {
  res
    .status(404)
    .json(new ApiResponse(false, 404, "Route not found", null, null));
});

export default app;
