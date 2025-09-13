import 'dotenv/config'
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from './configuration/passport.config';
import { healthRouter } from "./router/healthRouter";
import {authRouter} from './router/googleAuth.route';
const app = express();

//middlewares
app.use(express.json()); //middleware to parse/access the body
app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);
app.use(passport.initialize());
app.use(cookieParser()); //to configure the cokkie


//rotuer configuration
app.use("/api/v1/health", healthRouter);

//auth router configuraton
app.use("/api/v1/user/auth", authRouter);


export default app;
